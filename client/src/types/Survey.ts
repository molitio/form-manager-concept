export type Survey = {
  name: string;
  content?: string;
  contentObject?: {
    surveyPages: Record<string, SurveyPage>;
  };
};

export type SurveyPage = {
  name: string;
  questions: Record<number, SurveyQuestion>;
};

export type SurveyQuestion = {
  question: string;
  answers?: Record<string, SurveyAnswer>;
};

export type SurveyAnswer = {
  answer: string;
  dateCreate: string;
};
