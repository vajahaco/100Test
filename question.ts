
export type CharacteristicType = "extrovert" | "violence" | "ability" | "sociability" | "judgment" | " none";
type answer = {
    answer: string,
    weight: Partial<Record<CharacteristicType, -1 | 1>>; 
}
export type Question = {
  id: number;
  situation: string,
  question: string;
  answers: [answer,answer,answer,answer,answer]
};

const repeatedSituations = {
    GF_OF_RENTARO:  '당신은 렌타로의 여자친구입니다.',
    IM_RENTARO: '당신은 렌타로입니다.',
    FRIEND_OF_RENTARO: '당신은 렌타로의 친구입니다.',
    IM_READER: '당신은 평범한 독자입니다.'
} as const


const _questions:  Omit<Question, 'id'>[] = [
    {  
        situation: repeatedSituations.IM_READER,
        question: "나는 100여친 모두가 너무너무너무나 좋아!",
        answers: [
            { answer : '당연한 사실을', weight : {'ability' : 1} },
            { answer : '뭘 그리 새삼스레', weight : {'ability' : 1} },
            { answer : '묻고 있냐?', weight : {'ability' : 1} },
            { answer : '당연한 말이지', weight : {'ability' : 1} },
            { answer : '당연히 있지', weight : {'ability' : 1} }
        ]
    },
]

export const questions: Question[] = _questions.map((q, index) => ({
    ...q,
    id: index + 1 // 1부터 순차적으로 증가
}));
