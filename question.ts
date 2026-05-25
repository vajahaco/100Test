import { Weight } from "lucide-react-native"; // 필요시 유지

export type CharacteristicType = 
  | "openness"            /** 개방성: 수용력·괴짜력(2) vs 상식·보수적(-2) */
  | "conscientiousness"   /** 성실성: 계획·절제(2) vs 즉흥·충동적(-2) */
  | "extraversion"        /** 외향성: 인싸력·적극성(2) vs 아싸력·소극적(-2) */
  | "agreeableness"       /** 우호성: 이타심·순애(2) vs 개인주의·독점욕(-2) */
  | "neuroticism"         /** 신경증: 예민·불안·츤데레(2) vs 강철멘탈·덤덤함(-2) */
  | "madness";            /** 광기(1) vs 정상(0) -> 💡 0 또는 1만 허용 */

type Answer = {
  answer: string;
  // 💡 madness 필드만 0 | 1로 제한하고, 나머지는 설정하신 대로 -2 ~ 2 범위 허용
  weight: Omit<Record<CharacteristicType, -2 | -1 | 0 | 1 | 2>, "madness"> & {
    madness: 0 | 1;
  };
  id: 0 | 1 | 2 | 3 | 4;
}

export type Question = {
  id: number;
  situation: string;
  question: string;
  answers: [Answer, Answer, Answer, Answer, Answer];
};

const repeatedSituations = {
  GF_OF_RENTARO: '당신은 렌타로의 여자친구입니다.',
  IM_RENTARO: '당신은 렌타로입니다.',
  FRIEND_OF_RENTARO: '당신은 렌타로의 친구입니다.',
  IM_READER: '당신은 평범한 독자입니다.',
  WHO(name: string) {
    return '당신은 ' + name + '입니다.';
  }
} as const;

// 💡 OCEAN + Madness 기반 전면 리밸런싱 완료
const _questions: Omit<Question, 'id'>[] = [
  {  
    situation: repeatedSituations.IM_RENTARO,
    question: "카라네가 하하리를 때리기 직전이다!",
    answers: [
      { 
        answer: '발정난 하하리를 떼어낸다', 
        weight: { openness: 0, conscientiousness: 1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '츤데레(?) 직전인 카라네를 떼어낸다', 
        weight: { openness: 0, conscientiousness: -2, extraversion: 0, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '둘에게 서둘러 키스를 한다', 
        weight: { openness: 1, conscientiousness: -2, extraversion: 2, agreeableness: 0, neuroticism: 0, madness: 1 }, 
        id: 2 
      },
      { 
        answer: '둘이 너무 좋아하는 하카리를 부른다', 
        weight: { openness: 0, conscientiousness: 2, extraversion: 2, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 3 
      },
      { 
        answer: '근처 여친들에게 도움을 요청한다', 
        // 다수에게 협력을 구하는 극단적 우호성(+2)과 높은 외향성(+1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 1, agreeableness: 2, neuroticism: 0, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.FRIEND_OF_RENTARO,
    question: "렌타로가 여친때문에 노래방에 못 간다고 한다",
    answers: [
      { 
        answer: '일정이 언제 되는지 물어본다', 
        // 타인을 배려하며 차분하게 계획을 조율함 (성실성 1, 우호성 1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '나도 커플이니 더블데이트 제안한다', 
        // 새로운 모임을 주도하는 거침없는 인싸력 (개방성 1, 외향성 2)
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '물리적으로 해결한다', 
        // 충동 조절 장애(성실성 -2), 분노 표출(신경증 2) 및 돌발 광기(1)
        weight: { openness: -1, conscientiousness: -2, extraversion: 1, agreeableness: -2, neuroticism: 2, madness: 1 }, 
        id: 2 
      },
      { 
        answer: '집이나 가자', 
        // 서운한 감정을 숨기고 차단함 (외향성 -1, 우호성 -1, 신경증 1)
        weight: { openness: -1, conscientiousness: 0, extraversion: -1, agreeableness: -1, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '혼자 노래방에 간다', 
        // 완벽한 자발적 아웃사이더 마이웨이 (외향성 -2, 우호성 -2, 감정 동요 없음 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -2, agreeableness: -2, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.WHO("쿠스리"),
    question: "실수로 화학실을 터트린 것이다!",
    answers: [
      { 
        answer: '키마리한테 솔직하게 말하는 것이다...', 
        // 규칙과 정직을 중시하는 정석적 대처 (성실성 1, 정서적 안정 -1)
        weight: { openness: -1, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '펭타로 방영할 시간이니 보러가는 것이다!', 
        // 현실 도피성 극단적 즉흥성(-2), 뻔뻔한 멘탈(-2)과 쿠스리 특유의 광기(1)
        weight: { openness: 2, conscientiousness: -2, extraversion: 1, agreeableness: -2, neuroticism: -2, madness: 1 }, 
        id: 1 
      },
      { 
        answer: '화학실을 열심히 청소하는 것이다', 
        // 묵묵하고 성실하게 문제를 수습하는 강철 멘탈 (성실성 2, 신경증 -1)
        weight: { openness: 0, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '렌타로 패밀리 모두에게 도움을 빌리는 것이다!', 
        // 집단의 유대를 신뢰하고 의지하는 개방적 사회성 (외향성 1, 우호성 2)
        weight: { openness: 1, conscientiousness: 0, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '렌타로를 부르는 것이다! (나 천재냐..?)', 
        // 연인에게 전적으로 응석 부리고 의존함 (성실성 -1, 신경증 1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 0, agreeableness: 1, neuroticism: 1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.IM_RENTARO,
    question: "마이와 메이 씨, 데이트 일정이 겹쳐버렸다!",
    answers: [
      { 
        answer: '둘에게 이 사실을 털어놓는다', 
        // 관계의 왜곡을 싫어하는 고결한 도덕성 (성실성 1, 우호성 1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '둘에게 동시 데이트를 제안한다', 
        // 상식을 초월한 수용력(+2)과 패밀리를 품는 거대한 이타성(+2)
        weight: { openness: 2, conscientiousness: -1, extraversion: 2, agreeableness: 2, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '둘을 너무 좋아하는 하하리 씨를 부른다', 
        // 상황의 압박에서 벗어나고자 타인을 활용 (성실성 0, 신경증 1)
        weight: { openness: 1, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '마이가 메이 씨랑 데이트하게 나는 빠진다', 
        // 백합 관계 지지를 위해 본인을 희생하는 눈물겨운 과잉 헌신과 집착적 광기(1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 1 }, 
        id: 3 
      }, 
      { 
        answer: '3달 뒤에야 일정이 비는데 이때를 제안한다', 
        // 리스크를 차단하고 일정을 쪼개는 극단적 방어 기제 (성실성 2, 우호성 -2)
        weight: { openness: -2, conscientiousness: 2, extraversion: -2, agreeableness: -2, neuroticism: 0, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.IM_RENTARO,
    question: "날도 선선하니 이런 날에는...",
    answers: [
      { 
        answer: '랜덤한 1명과 단독 데이트!', 
        // 평범한 연인 관계 지향 (대규모 사교성 수치는 깎임)
        weight: { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '모두와 행복한 데이트!', 
        // 100카노식 대규모 인싸 패밀리즘 대폭발 (외향성 2, 우호성 2)
        weight: { openness: 1, conscientiousness: 1, extraversion: 2, agreeableness: 2, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '무한 지옥 근육 트레이닝!', 
        // 육체 단련을 향한 강박적 통제(성실성 2)와 초인적 광기(1)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 1 }, 
        id: 2 
      },
      { 
        answer: '그동안 지친 몸을 휴식하기!', 
        // 자기를 돌보는 조용한 마이웨이 휴식 (외향성 -2, 우호성 -1)
        weight: { openness: -1, conscientiousness: 1, extraversion: -2, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '밀린 숙제와 복습 분량 처리하기!', 
        // 규율과 책임을 칼같이 지키는 의무감 (성실성 2, 외향성 -1)
        weight: { openness: -2, conscientiousness: 2, extraversion: -1, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.WHO("미미미"),
    question: "어머, 파우치가 진흙탕에 빠져서...",
    answers: [
      { 
        answer: '절약은 미덕! 꺼내서 깨끗이 빨아씁니다~', 
        // 서민적이고 현실적인 생활력 수용 (성실성 1, 멘탈 덤덤함 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '어쩔 수 없이 여기까지입니다~', 
        // 겉으로는 쿨하게 단념하는 척함 (외향성 -1, 우호성 -1)
        weight: { openness: -1, conscientiousness: 0, extraversion: -1, agreeableness: -1, neuroticism: 1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '진흙 따위 미의 아우라로 정화하겠어요!', 
        // 나르시시즘적 자신감 표출과 확고한 독창성 (개방성 2, 외향성 2)
        weight: { openness: 2, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '렌타로에게 울며 새 파우치를 사달라고 조릅니다', 
        // 슬픔과 징징거림 표출(신경증 2), 애정 욕구 기반 본능 (우호성 -1)
        weight: { openness: 0, conscientiousness: -1, extraversion: 1, agreeableness: -1, neuroticism: 2, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '아무렇지 않은 척 쓰레기통에 버리고 새로 삽니다', 
        // 매몰비용을 칼같이 무시하는 차가운 도시인 (성실성 2, 외향성 -2)
        weight: { openness: -1, conscientiousness: 2, extraversion: -2, agreeableness: -2, neuroticism: -2, madness: 0 }, 
        id: 4 
      },
    ]
  },
];

export const questions: Question[] = _questions.map((q, index) => ({
  ...q,
  id: index + 1
}));