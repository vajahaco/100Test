import { questions } from '../data/questionData';
import { characters } from '../data/characterData';
import { Character, TraitProfile } from '../types/character';

// 결과 계산에 쓰는 성향 축 | trait axes used for the election
export const TRAIT_KEYS = [
  'openness',
  'conscientiousness',
  'extraversion',
  'agreeableness',
  'neuroticism',
  'madness',
] as const;

export type TraitKey = (typeof TRAIT_KEYS)[number];

export const TRAIT_LABELS: Record<TraitKey, { name: string; low: string; high: string }> = {
  openness: { name: '개방성', low: '상식·보수', high: '괴짜·수용' },
  conscientiousness: { name: '성실성', low: '즉흥·충동', high: '계획·절제' },
  extraversion: { name: '외향성', low: '아싸·소극', high: '인싸·적극' },
  agreeableness: { name: '우호성', low: '개인·독점', high: '이타·순애' },
  neuroticism: { name: '신경증', low: '강철멘탈', high: '예민·츤데레' },
  madness: { name: '광기', low: '정상', high: '광기' },
};

// madness(0~1)를 다른 축(-2~2)과 비슷한 비중으로 맞추기 위한 배율
const MADNESS_SCALE = 2;
const EPSILON = 1e-9;

const toVector = (p: TraitProfile): number[] =>
  TRAIT_KEYS.map((k) => (k === 'madness' ? p[k] * MADNESS_SCALE : p[k]));

// 질문별 선택지 평균 벡터 | mean answer vector per question
const questionMeans: Record<number, number[]> = Object.fromEntries(
  questions.map((q) => {
    const sum = TRAIT_KEYS.map(() => 0);
    q.answers.forEach((a) => toVector(a.weight).forEach((v, i) => (sum[i] += v)));
    return [q.id, sum.map((v) => v / q.answers.length)];
  }),
);

const cosineSimilarity = (a: number[], b: number[]): number => {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / Math.sqrt(normA * normB);
};

// 답변을 URL 파라미터용 문자열로 변환 | encode answers ("0" ~ "4" per question, in question order)
export const encodeAnswers = (answers: Record<number, number>): string =>
  questions.map((q) => (q.id in answers ? String(answers[q.id]) : '-')).join('');

// URL 파라미터를 답변으로 복원, 형식이 틀리면 null | decode answers, null if invalid or incomplete
export const decodeAnswers = (code: string | undefined): Record<number, number> | null => {
  if (!code || code.length !== questions.length) return null;

  const result: Record<number, number> = {};
  for (let i = 0; i < questions.length; i++) {
    const value = Number(code[i]);
    const question = questions[i];
    if (!Number.isInteger(value) || !question.answers.some((a) => a.id === value)) return null;
    result[question.id] = value;
  }
  return result;
};

export type CandidateResult = {
  character: Character;
  votes: number; // 받은 표 (동률 표는 나눠 가짐) | votes received (tied votes are split)
  expectedVotes: number; // 무작위로 답했을 때 기대 득표 | votes expected from random answers
  supportRate: number; // 지지율 = 득표 ÷ 기대 득표 (1 = 평균) | votes relative to expectation
  similarity: number; // 전체 성향과의 코사인 유사도 (-1 ~ 1)
  matchRate: number; // 성향 일치율 (0 ~ 100)
};

export type ElectionResult = {
  winner: CandidateResult;
  ranking: CandidateResult[];
  userProfile: TraitProfile; // 답변 평균 성향 | averaged user traits
  totalVotes: number; // 유효표 | valid votes
  abstentions: number; // 무효표(어느 후보와도 닮지 않은 답변) | answers that matched nobody
};

type Ballot = Record<string, number>; // 후보 id → 표 | candidate id -> vote share

// 답변 하나의 표: 같은 질문 선택지 평균 대비 가장 닮은 후보에게 1표 (동률이면 나눔, 닮은 후보가 없으면 무효)
// one answer's ballot: 1 vote for the most similar candidate after centering, split on ties, empty if nobody fits
const castBallot = (questionId: number, weight: TraitProfile): Ballot => {
  const meanVector = questionMeans[questionId];
  const answerVector = toVector(weight).map((v, i) => v - meanVector[i]);
  const similarities = characters.map((c) => cosineSimilarity(answerVector, toVector(c.profile)));
  const best = Math.max(...similarities);
  if (best <= 0) return {};

  const tied = characters.filter((_, i) => best - similarities[i] < EPSILON);
  return Object.fromEntries(tied.map((c) => [c.id, 1 / tied.length]));
};

/**
 * 투표와 당선
 * 1. 투표: 각 답변이 가장 닮은 여친에게 1표를 던진다. (castBallot)
 * 2. 기대 득표: 같은 질문들에 무작위로 답했다면 각 여친이 받았을 평균 표.
 *    질문지에 특정 성향의 선택지가 많아도 그 여친이 유리해지지 않도록 보정한다.
 * 3. 당선: 지지율(득표 ÷ 기대 득표)이 가장 높은 여친. 같으면 득표 → 전체 성향 유사도 순.
 */
export const runElection = (answers: Record<number, number>): ElectionResult => {
  const votes: Record<string, number> = Object.fromEntries(characters.map((c) => [c.id, 0]));
  const expected: Record<string, number> = Object.fromEntries(characters.map((c) => [c.id, 0]));
  const total: TraitProfile = {
    openness: 0,
    conscientiousness: 0,
    extraversion: 0,
    agreeableness: 0,
    neuroticism: 0,
    madness: 0,
  };
  let answeredCount = 0;
  let abstentions = 0;

  questions.forEach((question) => {
    const answer = question.answers.find((a) => a.id === answers[question.id]);
    if (!answer) return;

    answeredCount++;
    TRAIT_KEYS.forEach((k) => {
      total[k] += answer.weight[k];
    });

    // 기대 득표: 이 질문의 모든 선택지 표를 평균 | expected votes: average ballot over all choices
    question.answers.forEach((a) => {
      Object.entries(castBallot(question.id, a.weight)).forEach(([id, v]) => {
        expected[id] += v / question.answers.length;
      });
    });

    const ballot = castBallot(question.id, answer.weight);
    if (Object.keys(ballot).length === 0) {
      abstentions++;
      return;
    }
    Object.entries(ballot).forEach(([id, v]) => {
      votes[id] += v;
    });
  });

  const divisor = Math.max(answeredCount, 1);
  const userProfile = Object.fromEntries(
    TRAIT_KEYS.map((k) => [k, total[k] / divisor]),
  ) as TraitProfile;
  const userVector = toVector(userProfile);

  const ranking: CandidateResult[] = characters
    .map((character) => {
      const similarity = cosineSimilarity(userVector, toVector(character.profile));
      const expectedVotes = expected[character.id];
      return {
        character,
        votes: votes[character.id],
        expectedVotes,
        supportRate: expectedVotes > 0 ? votes[character.id] / expectedVotes : 0,
        similarity,
        matchRate: Math.round(((similarity + 1) / 2) * 100),
      };
    })
    .sort(
      (a, b) =>
        b.supportRate - a.supportRate || b.votes - a.votes || b.similarity - a.similarity,
    );

  return {
    winner: ranking[0],
    ranking,
    userProfile,
    totalVotes: answeredCount - abstentions,
    abstentions,
  };
};

// 표 수 표시용 (나눠 가진 표는 소수 첫째 자리까지) | format vote count
export const formatVotes = (votes: number): string =>
  Number.isInteger(votes) ? String(votes) : votes.toFixed(1);
