export type CharacteristicType = 
  | "openness"            /** 개방성: 수용력·괴짜력(2) vs 상식·보수적(-2) */
  | "conscientiousness"   /** 성실성: 계획·절제(2) vs 즉흥·충동적(-2) */
  | "extraversion"        /** 외향성: 인싸력·적극성(2) vs 아싸력·소극적(-2) */
  | "agreeableness"       /** 우호성: 이타심·순애(2) vs 개인주의·독점욕(-2) */
  | "neuroticism";         /** 신경증: 예민·불안·츤데레(2) vs 강철멘탈·덤덤함(-2) */

export type Answer = {
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
