
type CharacteristicType = "extrovert" | "violence" | "ability" | "sociability" | "judgment";

type Question = {
  id: number;
  text: string;
  weights: Partial<Record<CharacteristicType, -1 | 1>>; 
};

const OPTION_VALUES = {
  "너무 좋아": 2,
  "좋아": 1,
  "보통": 0,
  "싫어": -1,
  "너무 싫어": -2,
} as const;


const _questions:  Omit<Question, 'id'>[] = [
    {
        text: "나는 렌타로 외 최애가 확실히 있다",
        weights: { "judgment" : 1 }
    },
    {
        text: "나는 ",
        weights: { "judgment" : 1 }
    },
    {
        text: "나는 렌타로 외 최애가 확실히 있다",
        weights: { "judgment" : 1 }
    },
    {
        text: "나는 렌타로 외 최애가 확실히 있다",
        weights: { "judgment" : 1 }
    },
]

const questions: Question[] = _questions.map((q, index) => ({
    ...q,
    id: index + 1 // 1부터 순차적으로 증가
}));
