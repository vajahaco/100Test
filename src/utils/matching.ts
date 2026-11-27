import { questions as originalQuestions } from '../data/questionData';
import { weight } from '../types/question'
import { girlfriends } from '../data/girlfriendsData';

const Charactoristics = [
    'openness',
    'conscientiousness',
    'extraversion',
    'agreeableness',
    'neuroticism'
] as const;

// 1. 단일 답변에 대한 1등 캐릭터를 찾는 함수 (기권표 처리 포함)
export function getTopCharacterForAnswer(answerWeight: weight): string | null {
    let topName: string | null = null;
    let maxSimilarity = -Infinity;

    // 해당 답변의 가중치 크기 제곱 계산
    const answerNormSq = Charactoristics.reduce((acc, key) => acc + answerWeight[key] ** 2, 0);

    // [핵심] 가중치가 모두 0이거나 madness만 있는 경우 (기권표)
    if (answerNormSq === 0) return null; 

    for (const gf of girlfriends) {
        let dotProduct = 0;
        for (const key of Charactoristics) {
            dotProduct += gf.weight[key] * answerWeight[key];
        }

        const gfNormSq = Charactoristics.reduce((acc, key) => acc + gf.weight[key] ** 2, 0);
        const denominatorSq = answerNormSq * gfNormSq;

        if (denominatorSq <= 0) continue;

        const similarity = dotProduct / Math.sqrt(denominatorSq);

        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            topName = gf.name;
        }
    }

    return topName; // 기권표가 아니면 무조건 1등 이름 반환
}


// 2. 전체 결과를 집계하는 메인 함수
export function CalculateResult(answers: Record<number, number>) {
    // 득표수를 기록할 스코어보드 (예: { "하하리": 3, "카라네": 5 })
    const scoreboard: Record<string, number> = {};
    
    // madness 누적을 위한 별도 변수
    let totalMadness = 0;

    // 모든 질문을 순회하며 투표 진행
    for (const question of originalQuestions) {
        const answerId = answers[question.id];
        if (answerId === undefined) continue;

        const answer = question.answers.find((a) => a.id === answerId);
        if (!answer) continue;

        // madness 수치는 따로 누적
        if (answer.weight.madness) {
            totalMadness += answer.weight.madness;
        }

        // 해당 답변의 가중치로 1등 캐릭터 투표
        const votedCharacter = getTopCharacterForAnswer(answer.weight);
        
        // 기권표(null)가 아닐 경우에만 스코어보드에 1표 추가
        if (votedCharacter) {
            scoreboard[votedCharacter] = (scoreboard[votedCharacter] || 0) + 1;
        }
    }

    // 3. 스코어보드에서 '찐 1등(최다 득표자)' 가리기
    let trueWinner = '';
    let maxVotes = 0;

    for (const [characterName, votes] of Object.entries(scoreboard)) {
        if (votes > maxVotes) {
            maxVotes = votes;
            trueWinner = characterName;
        }
    }

    // 결과 반환 (필요에 따라 스코어보드 전체나 투표수도 반환 가능)
    return {
        topCharacter: trueWinner,
        scoreboard: scoreboard,           // 나중에 "당신은 카라네와 5번 일치했습니다!" 같은 UI에 활용 가능
        isMadness: totalMadness > 0 ? 1 : 0 
    };
}