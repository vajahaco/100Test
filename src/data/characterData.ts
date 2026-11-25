import { Character } from '../types/character';

// 빠른 검사 후보 여친 목록 | candidate list for the quick test
// profile은 questionData의 가중치와 같은 척도(-2 ~ 2, madness 0 ~ 1)를 사용합니다.
export const characters: Character[] = [
  {
    id: 'hakari',
    name: '하나조노 하카리',
    description: '사교성이 좋고 연애 정보력이 뛰어난 행동파 여친',
    tag: '외향형 / 우호형',
    color: '#FFF1F2',
    iconColor: '#c2479d',
    profile: { openness: 1, conscientiousness: 1, extraversion: 2, agreeableness: 2, neuroticism: 0, madness: 0 },
  },
  {
    id: 'karane',
    name: '인다 카라네',
    description: '속마음은 따뜻하지만 표현이 서툰 전형적인 츤데레 여친',
    tag: '신경증 / 츤데레',
    color: '#EFF6FF',
    iconColor: '#2563EB',
    profile: { openness: 0, conscientiousness: 1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 0 },
  },
  {
    id: 'shizuka',
    name: '요시모토 시즈카',
    description: '책을 좋아하고 소심하지만 다정한 문학소녀 여친',
    tag: '내향형 / 우호형',
    color: '#F0FDF4',
    iconColor: '#16A34A',
    profile: { openness: 0, conscientiousness: 1, extraversion: -2, agreeableness: 2, neuroticism: 1, madness: 0 },
  },
  {
    id: 'nano',
    name: '에이아이 나노',
    description: '이성적이고 효율적인 정보 수집에 능한 강철멘탈 AI형 여친',
    tag: '성실성 / 이성적',
    color: '#F8FAFC',
    iconColor: '#475569',
    profile: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: -1, neuroticism: -2, madness: 0 },
  },
  {
    id: 'kusuri',
    name: '야쿠젠 쿠스리',
    description: '화학실의 천재이자 늘 새로운 약을 만들어내는 트릭스터 여친',
    tag: '개방성 / 광기',
    color: '#FEF9C3',
    iconColor: '#CA8A04',
    profile: { openness: 2, conscientiousness: -2, extraversion: 0, agreeableness: -1, neuroticism: -1, madness: 1 },
  },
  {
    id: 'hahari',
    name: '하나조노 하하리',
    description: '아기들을 극도로 사랑하는 연애의 광전사 여친',
    tag: '외향형 / 광기',
    color: '#FCE7F3',
    iconColor: '#DB2777',
    profile: { openness: 2, conscientiousness: -1, extraversion: 2, agreeableness: 1, neuroticism: 0, madness: 1 },
  },
];
