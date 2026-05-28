import { Weight } from "lucide-react-native"; // 필요시 유지

export type CharacteristicType = 
  | "openness"            /** 개방성: 수용력·괴짜력(2) vs 상식·보수적(-2) */
  | "conscientiousness"   /** 성실성: 계획·절제(2) vs 즉흥·충동적(-2) */
  | "extraversion"        /** 외향성: 인싸력·적극성(2) vs 아싸력·소극적(-2) */
  | "agreeableness"       /** 우호성: 이타심·순애(2) vs 개인주의·독점욕(-2) */
  | "neuroticism";         /** 신경증: 예민·불안·츤데레(2) vs 강철멘탈·덤덤함(-2) */

type Answer = {
  answer: string;
  weight: Record<CharacteristicType, -2 | -1 | 0 | 1 | 2> & {
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
  NEWGF_OF_RENTARO: '당신은 렌타로의 새로운 여자친구입니다.',
  IM_RENTARO: '당신은 렌타로입니다.',
  FRIEND_OF_RENTARO: '당신은 렌타로의 친구입니다.',
  IM_READER: '당신은 평범한 독자입니다.',
  WHO(name: string) {
    return '당신은 ' + name + '입니다.';
  }
} as const;

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
        answer: '둘이 너무 좋아하는 하하리를 부른다', 
        weight: { openness: 0, conscientiousness: 2, extraversion: 2, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 3 
      },
      { 
        answer: '근처 여친들에게 도움을 요청한다', 
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
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '나도 커플이니 더블데이트 제안한다', 
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '물리적으로 해결한다', 
        weight: { openness: -1, conscientiousness: -2, extraversion: 1, agreeableness: -2, neuroticism: 2, madness: 1 }, 
        id: 2 
      },
      { 
        answer: '집이나 가자 ㅠㅠ', 
        weight: { openness: -1, conscientiousness: 0, extraversion: -1, agreeableness: -1, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '혼자 노래방에 간다', 
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
        weight: { openness: -1, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '펭타로 방영할 시간이니 보러가는 것이다!', 
        weight: { openness: 2, conscientiousness: -2, extraversion: 1, agreeableness: -2, neuroticism: -2, madness: 1 }, 
        id: 1 
      },
      { 
        answer: '화학실을 열심히 청소하는 것이다', 
        weight: { openness: 0, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '렌타로 패밀리 모두에게 도움을 빌리는 것이다!', 
        weight: { openness: 1, conscientiousness: 0, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '렌타로를 부르는 것이다! (나 천재냐..?)', 
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
        weight: { openness: 0, conscientiousness: 1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '둘에게 동시 데이트를 제안한다', 
        weight: { openness: 2, conscientiousness: -1, extraversion: 2, agreeableness: 2, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '둘을 너무 좋아하는 하하리 씨를 부른다', 
        weight: { openness: 1, conscientiousness: 0, extraversion: 0, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '마이가 메이 씨랑 데이트하게 나는 빠진다', 
        weight: { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 1 }, 
        id: 3 
      }, 
      { 
        answer: '3달 뒤에야 일정이 비는데 이때를 제안한다', 
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
        weight: { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '모두와 행복한 데이트!', 
        weight: { openness: 1, conscientiousness: 1, extraversion: 2, agreeableness: 2, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '무한 지옥 근육 트레이닝!', 
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 1 }, 
        id: 2 
      },
      { 
        answer: '그동안 지친 몸을 휴식하기!', 
        weight: { openness: -1, conscientiousness: 1, extraversion: -2, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '밀린 숙제와 복습 분량 처리하기!', 
        weight: { openness: -2, conscientiousness: 2, extraversion: -1, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.WHO("미미미"),
    question: "어머, 새로 산 파우치가 진흙탕에 빠져서...",
    answers: [
      { 
        answer: '절약은 미덕! 꺼내서 깨끗이 빨아씁니다', 
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '파우치 안의 물품만 꺼냅니다', 
        weight: { openness: -1, conscientiousness: 0, extraversion: -1, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '진흙 따위 미의 아우라로 패션화하겠어요!', 
        weight: { openness: 2, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '안타깝지만 여기까지입니다~', 
        weight: { openness: 0, conscientiousness: -1, extraversion: 0, agreeableness: -1, neuroticism: 2, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '파우치를 매장에서 교환해보죠', 
        weight: { openness: -1, conscientiousness: 2, extraversion: 0, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.NEWGF_OF_RENTARO,
    question: "렌타로패밀리 인원이 너무 많아 ㅠㅠ",
    answers: [
      { 
        answer: '똑똑한 나노에게 여친들에 대해 물어본다', 
        // 이성적이고 효율적인 정보 수집 (성실성 1, 신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '사교성 좋은 하카리에게 여친들에 대해 물어본다', 
        // 연애 정보력 및 대인관계 중심 대처 (외향성 1, 우호성 1)
        weight: { openness: 1, conscientiousness: 0, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '관찰력이 뛰어난 메메에게 여친들에 대해 물어본다', 
        // 조용하고 내향적인 인물에게 접근 (외향성 -1, 개방성 1)
        weight: { openness: 1, conscientiousness: 0, extraversion: -1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '늘 적극적인 이쿠에게 여친들에 대해 물어본다', 
        // 근성과 열정 성향의 인물과 소통 (외향성 1, 성실성 1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '모두를 너무 좋아하는 하하리에게...', 
        // 상식을 아득히 초월한 하하리의 늪으로 돌진 (개방성 2, 우호성 1, 광기 1)
        weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 1 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.WHO("우사"),
    question: "외롭사할 거 같아... 전화를",
    answers: [
      { 
        answer: '늘 한적한 야쿠 씨에게?', 
        // 연장자 특유의 덤덤하고 여유로운 치유 기대 (외향성 -1, 신경증 -1)
        weight: { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '늘 거리감없는 모미지에게?', 
        // 신체 접촉 및 직관적 교감 지향 (개방성 1, 외향성 1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '늘 웃어주는 메이 씨에게?', 
        // 무조건적인 수용과 절대 복종의 편안함 (우호성 2, 신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 2, neuroticism: -1, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '늘 호전적인 에이라 씨에게?', 
        // 물리적 타격(?)과 격동적인 에너지 요구 (외향성 1, 신경증 1)
        weight: { openness: -1, conscientiousness: 0, extraversion: 1, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '늘 다정한 시즈카에게?', 
        // 소심하고 가녀린 존재들끼리의 내향적 위로 (외향성 -2, 우호성 2)
        weight: { openness: 0, conscientiousness: 0, extraversion: -2, agreeableness: 2, neuroticism: 1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.IM_RENTARO,
    question: "쿠스리 선배가 넘어지려는데\n교감선생님이 계셔서 뛸 수가!",
    answers: [
      { 
        answer: '딥키스를 감수하고 뛰어야 해!', 
        // 교감과의 키스라는 상벌을 초월한 살신성인 순애 (우호성 2, 광기 1)
        weight: { openness: 2, conscientiousness: -2, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 1 }, 
        id: 0 
      },
      { 
        answer: '쿠션을 쿠스리 선배 밑으로 던지자', 
        // 순간적이고 이성적인 차선책 도출 (성실성 1, 신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '교감선생님 최애 화장품을 투척해서 미끼로', 
        // 교감의 약점을 찌르는 탁월한 잔머리·창의성 (개방성 2, 성실성 -1)
        weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '뛰지말고 슬라이딩을 하자', 
        // 규칙(뛰지 말기)은 아슬아슬하게 우회하는 임기응변 충동파 (성실성 -1, 외향성 1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '쿠스리 선배에게 초간단 낙법을 알려주자', 
        // 이 비상사태에 말로 가르치려는 이론파 혹은 덤덤한 강철 멘탈 (성실성 2, 신경증 -2)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -2, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: repeatedSituations.IM_RENTARO,
    question: "최근 무리해선가 너무 피곤한데...",
    answers: [
      { 
        answer: '잠을 자볼까?', 
        // 기본적이고 평범한 생리적 욕구 충실 (성실성 1, 덤덤함 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '목욕을 해볼까?', 
        // 힐링과 정서적 안정을 추구 (신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '밖에 나가 피로를 날리자!', 
        // 피곤할 때 도리어 나가는 극단적 에너자이저 (외향성 2, 성실성 -1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '침대에서 핸드폰이나 할까?', 
        // 다소 무기력하고 즉흥적인 휴식 (성실성 -1, 외향성 -1)
        weight: { openness: -1, conscientiousness: -1, extraversion: -1, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '간단한 소일거리만 할까?', 
        // 쉬는 와중에도 끊임없이 생산적인 일을 찾는 워커홀릭 (성실성 2, 외향성 -1)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
];

export const questions: Question[] = _questions.map((q, index) => ({
  ...q,
  id: index + 1
}));