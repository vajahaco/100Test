import { weight } from '../types/question';

type Girlfriend = {
    id: number;
    name: string;
    description: string;
    tag: string;
    color: string;
    iconColor: string;
    weight: weight;
}


export const girlfriends: Girlfriend[] = [
  { id: 1, name: '하나조노 하카리', description: '사교성이 좋고 므흐훗한 행동파 여친', tag: '외향형 / 우호형', color: '#FFF1F2', iconColor: '#c2479d', 
    weight: { openness: 2, conscientiousness: 1, extraversion: 2, agreeableness: 1, neuroticism: -1, madness: 0 } },
  { id: 2, name: '인다 카라네', description: '속마음은 따뜻하지만 표현이 서툰 전형적인 츤데레 여친', tag: '신경증 / 츤데레', color: '#EFF6FF', iconColor: '#2563EB', 
    weight: { openness: 1, conscientiousness: 2, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 0 } },
  { id: 3, name: '요시모토 시즈카', description: '책을 좋아하고 소심하지만 다정한 문학소녀 여친', tag: '내향형 / 우호형', color: '#F0FDF4', iconColor: '#16A34A', 
    weight: { openness: 2, conscientiousness: 1, extraversion: -1, agreeableness: 2, neuroticism: -1, madness: 0 } },
  { id: 4, name: '에이아이 나노', description: '이성적이고 효율적인 정보 수집에 능한 AI형 여친', tag: '성실성 / 이성적', color: '#F8FAFC', iconColor: '#475569', 
    weight: { openness: 2, conscientiousness: 2, extraversion: -1, agreeableness: 1, neuroticism: -1, madness: 0 } },
  { id: 5, name: '야쿠젠 쿠스리', description: '화학실의 천재이자 늘 새로운 약을 만들어내는 트릭스터 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
  { id: 6, name: '하나조노 하하리', description: '아기들을 극도로 사랑하는 연애의 광전사 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
  { id: 7, name: '하라가 쿠루미', description: '식욕 MAX! 그러나 먹는 모습이 천사같은 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
  { id: 8, name: '메이도 메이', description: '우아하지만 강아지같기도 한 메이드 누님 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
  { id: 9, name: '스토 이쿠', description: '노력한다는 것, 그것은 괴롭이니까! 운동부 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
  { id: 10, name: '우츠쿠시스기 미미미', description: '최고로 아름다운 미의 여신 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
  { id: 11, name: '카쿠레 메메', description: '몸배 발군, 외모 발군의 부끄럼쟁이 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04', 
    weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 1 } },
] as const;


