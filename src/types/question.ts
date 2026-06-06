// OCEAN 성격 모델을 활용한 특성 유니온 정의 | define an union type using OCEAN personality traits
export type CharacteristicType = 
  | "openness"            /** 개방성: 수용력·괴짜력(2) vs 상식·보수적(-2) */
  | "conscientiousness"   /** 성실성: 계획·절제(2) vs 즉흥·충동적(-2) */
  | "extraversion"        /** 외향성: 인싸력·적극성(2) vs 아싸력·소극적(-2) */
  | "agreeableness"       /** 우호성: 이타심·순애(2) vs 개인주의·독점욕(-2) */
  | "neuroticism";         /** 신경증: 예민·불안·츤데레(2) vs 강철멘탈·덤덤함(-2) */

// OCEAN + madness로 가중치 확정 및 하나의 답변 정의 | define a type for an answer that includes the OCEAN characteristics and an additional 'madness' characteristic
// madness는 0 또는 1로 표현되며, 1은 '광기'를 나타냅니다. | 'madness' is represented as either 0 or 1, where 1 indicates 'madness'
export type Answer = {
  answer: string;
  weight: Record<CharacteristicType, -2 | -1 | 0 | 1 | 2> & {
    madness: 0 | 1; 
  };
  id: 0 | 1 | 2 | 3 | 4;
}

// 100그녀 인물 유형 테스트에 사용되는 질문지 정의 | define a type for a question used in the 100kanojo personality test
export type Question = {
  id: number;
  situation: string;
  question: string;
  answers: [Answer, Answer, Answer, Answer, Answer];
};
