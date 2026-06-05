import { Question } from '../types/question';



const SITUATION_TEMPLATES = {
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
    situation: SITUATION_TEMPLATES.IM_RENTARO,
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
    situation: SITUATION_TEMPLATES.FRIEND_OF_RENTARO,
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
    situation: SITUATION_TEMPLATES.WHO("쿠스리"),
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
    situation: SITUATION_TEMPLATES.IM_RENTARO,
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
    situation: SITUATION_TEMPLATES.IM_RENTARO,
    question: "날도 선선하니 이런 날에는...",
    answers: [
      { 
        answer: '오랜만에 친구랑 놀기!', 
        weight: { openness: 0, conscientiousness: 0, extraversion: -1, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '영상 시청이나 게임하기!', 
        weight: { openness: 1, conscientiousness: 1, extraversion: 2, agreeableness: 2, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '무한 지옥 근육 트레이닝!', 
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 1 }, 
        id: 2 
      },
      { 
        answer: '부모님 일 도와드리기!', 
        weight: { openness: -1, conscientiousness: 1, extraversion: -2, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '성실하게 공부하기!', 
        weight: { openness: -2, conscientiousness: 2, extraversion: -1, agreeableness: -1, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.WHO("미미미"),
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
    situation: SITUATION_TEMPLATES.NEWGF_OF_RENTARO,
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
    situation: SITUATION_TEMPLATES.WHO("우사"),
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
    situation: SITUATION_TEMPLATES.IM_RENTARO,
    question: "쿠스리 선배가 넘어지려는데\n교감선생님이 계셔서 뛸 수가!",
    answers: [
      { 
        answer: '딥키스를 감수하고 뛰어야 해!', 
        // 교감과의 키스라는 상벌을 초월한 살신성인 순애 (우호성 2, 광기 1)
        weight: { openness: 2, conscientiousness: -2, extraversion: 1, agreeableness: 2, neuroticism: 1, madness: 1 }, 
        id: 0 
      },
      { 
        answer: '쿠션을 쿠스리 선배 밑으로 던지자!', 
        // 순간적이고 이성적인 차선책 도출 (성실성 1, 신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: 0, agreeableness: 1, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '교감선생님 최애 화장품을 미끼로!', 
        // 교감의 약점을 찌르는 탁월한 잔머리·창의성 (개방성 2, 성실성 -1)
        weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '뛰지말고 슬라이딩을 하자!', 
        // 규칙(뛰지 말기)은 아슬아슬하게 우회하는 임기응변 충동파 (성실성 -1, 외향성 1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 1, agreeableness: 1, neuroticism: 0, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '쿠스리 선배에게 낙법을 알려주자!', 
        // 이 비상사태에 말로 가르치려는 이론파 혹은 덤덤한 강철 멘탈 (성실성 2, 신경증 -2)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -2, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.IM_RENTARO,
    question: "최근 과로로 몸이 부서질 것 같이 피곤한데...",
    answers: [
      { 
        answer: '내일을 위해 바로 꿀잠을 잔다', 
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '따뜻한 목욕탕에 가서 힐링을 즐긴다', 
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '정신 번쩍 들게 밖으로 나가 러닝을 뛴다!', 
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '누워서 아무 생각 없이 스마트폰 게임이나 한다', 
        weight: { openness: -1, conscientiousness: -1, extraversion: -1, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '밀린 방 청소나 가계부 정리 등 생산적인 소일거리를 한다', 
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.WHO("에이라"),
    question: "크윽 발에 부상을 입어서 못 걷겠어",
    answers: [
      {
        answer: '모미지한테 치유의 마사지를 부탁해볼까?', 
        // 기본적이고 평범한 생리적 욕구 충실 (성실성 1, 덤덤함 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '치유 선생님에게 응급처치법을 물어볼까?', 
        // 힐링과 정서적 안정을 추구 (신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '하하리 씨에게 차 좀 태워달라고 해볼까?', 
        // 피곤할 때 도리어 나가는 극단적 에너자이저 (외향성 2, 성실성 -1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '일단 제자리에서 쉬어볼까?', 
        // 다소 무기력하고 즉흥적인 휴식 (성실성 -1, 외향성 -1)
        weight: { openness: -1, conscientiousness: -1, extraversion: -1, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '비싸지만 확실한 진심 구조단을 호출할까?', 
        // 쉬는 와중에도 끊임없이 생산적인 일을 찾는 워커홀릭 (성실성 2, 외향성 -1)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.WHO("나노"),
    question: "요시모토 시즈카가 울고 있어",
    answers: [
      {
        answer: '이유를 물어 해결하는게 효율적.', 
        //!! 다소 강압적이면서도 작중 전개상 새여친가 찌리릿하기 위해선 필수불가결적이게 효과적인 방법
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: "'우선 곁에만 있어주기'", 
        // 힐링과 정서적 안정을 추구 (신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '렌타로를 부르는 게 합리적.', 
        // 피곤할 때 도리어 나가는 극단적 에너자이저 (외향성 2, 성실성 -1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: "'요시즈카를 꽉 껴앉아 준다'", 
        // 다소 무기력하고 즉흥적인 휴식 (성실성 -1, 외향성 -1)
        weight: { openness: -1, conscientiousness: -1, extraversion: -1, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: "'모두에게 이 일을 상담하기'", 
        // 쉬는 와중에도 끊임없이 생산적인 일을 찾는 워커홀릭 (성실성 2, 외향성 -1)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.WHO("메루"),
    question: "도저히 메르한(동화책 소재)이\n안 떠올라요",
    answers: [
      {
        answer: '렌타로에게 최근 있었던 일을 물어요', 
        //!! 다소 강압적이면서도 작중 전개상 새여친가 찌리릿하기 위해선 필수불가결적이게 효과적인 방법
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 0 
      },
      { 
        answer: '시즈카가 재밌게 본 이야기를 들어봐요', 
        // 힐링과 정서적 안정을 추구 (신경증 -1)
        weight: { openness: 0, conscientiousness: 1, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 1 
      },
      { 
        answer: '유치원에 봉사하러 가봐요', 
        // 피곤할 때 도리어 나가는 극단적 에너자이저 (외향성 2, 성실성 -1)
        weight: { openness: 1, conscientiousness: -1, extraversion: 2, agreeableness: 0, neuroticism: 0, madness: 0 }, 
        id: 2 
      },
      { 
        answer: '기존에 썼던 이야기를 변주해봐요', 
        // 다소 무기력하고 즉흥적인 휴식 (성실성 -1, 외향성 -1)
        weight: { openness: -1, conscientiousness: -1, extraversion: -1, agreeableness: 0, neuroticism: 1, madness: 0 }, 
        id: 3 
      }, 
      { 
        answer: '다른 동화책을 읽어요', 
        // 쉬는 와중에도 끊임없이 생산적인 일을 찾는 워커홀릭 (성실성 2, 외향성 -1)
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 0, neuroticism: -1, madness: 0 }, 
        id: 4 
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.WHO("모모하"),
    question: "제길, 신성한 수업 중인데\n낮술이 미치도록 당긴다!\n칠판이 맥주 캔으로 보여어어!!",
    answers: [
      {
        answer: '물 마시는 척 보온병에 담긴 벚꽃주를 마신다',
        weight: { openness: 2, conscientiousness: -2, extraversion: -1, agreeableness: -0, neuroticism: 1, madness: 1 },
        // [Reason] 수업 중에 대담하게 술을 빠는 상식 파괴 행위이므로 기행력(+2), 노답 충동성(-2)과 함께 모모하의 일상적 광기(madness: 1)를 반영함.
        id: 0
      },
      {
        answer: '학생들에게 자습을 시키고 당당하게 교무실로 도망친다',
        weight: { openness: 1, conscientiousness: -2, extraversion: 2, agreeableness: -1, neuroticism: -1, madness: 0 },
        // [Reason] 교사로서의 책임을 팽개치고 당당하게 마이웨이를 걷는 태도이므로 도덕성 최하치(-2) 및 뻔뻔한 외향성(+2) 부여.
        id: 1
      },
      {
        answer: '“취객의 도덕적 문제점을 알아보자!”라며 수업 하는 척 자연스럽게 술을 깐다',
        weight: { openness: 2, conscientiousness: -2, extraversion: 2, agreeableness: 1, neuroticism: 0, madness: 1 },
        // [Reason] 학생들 앞에서 대놓고 술판을 벌이는 100그녀식 세계관 개변급 광기이므로 개방성(+2), 쇼맨십(+2), madness: 1 확정.
        id: 2
      },
      {
        answer: '렌타로의 얼굴을 떠올리며... 꾹 참아본다... 으으으...',
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 2, neuroticism: 2, madness: 0 },
        // [Reason] 사랑하는 연인(렌타로)을 위해 본능을 억제하려는 지독한 순애 무브이므로 성실성(+2), 우호성(+2), 금단증상으로 인한 신경증(+2).
        id: 3
      },
      {
        answer: '책상 밑에 숨겨져있는 청주를 홀짝 마신다',
        weight: { openness: -2, conscientiousness: 2, extraversion: -2, agreeableness: 0, neuroticism: -2, madness: 0 },
        // [Reason] 모모하라고는 믿을 수 없는 극단적인 상식인이자 철저한 기계적 교육자 모드이므로 개방성(-2), 강철의 평정심(-2)으로 밸런싱.
        id: 4
      },
    ]
  },
  {  
    situation: SITUATION_TEMPLATES.WHO("히메카"),
    question: "도대체 뭘 해야 남들에게 ‘기인’처럼 보일 수 있을까?!",
    answers: [
      {
        answer: '하하리에게 "아빠"같다고 칭찬(?)한다',
        weight: { openness: 2, conscientiousness: -1, extraversion: 1, agreeableness: 2, neuroticism: 0, madness: 1 },
        // [Reason] 말도 안 통하는 동물과 대화로 해결하려는 야마메 특유의 상식 밖 생명 순애이므로 우호성(+2)과 개방성(+2), 그리고 원작 고증의 madness: 1 부여.
        id: 0
      },
      {
        answer: '마츠리에게 축제(경로당 행사)한다고 알려준다',
        weight: { openness: 1, conscientiousness: -2, extraversion: 2, agreeableness: 2, neuroticism: 0, madness: 1 },
        // [Reason] 괴물 같은 피지컬로 밭을 갈아엎는 물리적 기행이자 대책 없는 즉흥 행동이므로 성실성(-2), 외향적 행동력(+2), madness: 1 확정.
        id: 1
      },
      {
        answer: '타마와 수컷 고양이 매료시키기 대결을 한다',
        weight: { openness: -1, conscientiousness: 2, extraversion: -1, agreeableness: 1, neuroticism: -1, madness: 0 },
        // [Reason] 업체를 이용해 법과 매뉴얼대로 안전하게 수습하는 지극히 현실적이고 이성적인 대책이므로 성실성(+2)과 차분함(-1).
        id: 2
      },
      {
        answer: '"눈 뜨고 잠자기"를 연마해 네무에게 자랑한다',
        weight: { openness: 0, conscientiousness: -1, extraversion: -1, agreeableness: 2, neuroticism: 2, madness: 0 },
        // [Reason] 문제를 해결하지 못하고 감정이 복받쳐 연인에게 의지하는 가녀린(?) 모습이므로 우호성(+2) 및 감정 과잉의 신경증(+2).
        id: 3
      },
      {
        answer: '위의 4개 모두 별로라서 그냥 평범하게 지낸다',
        weight: { openness: -2, conscientiousness: 2, extraversion: -2, agreeableness: -2, neuroticism: -2, madness: 0 },
        // [Reason] 살아있는 것을 사정없이 처단하는 행위로, 야마메의 성향과 정반대인 극단적 이성파(나노 계열) 스탯인 우호성(-2), 개방성(-2), 신경증(-2) 매칭.
        id: 4
      },
    ]
  },
];

export const questions: Question[] = _questions.map((q, index) => ({
  ...q,
  id: index + 1
}));