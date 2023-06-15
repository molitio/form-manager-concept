export type Survey = {
  name: string;
  content: {
    surveyPages: Record<string, SurveyPage>;
  };
};

export type SurveyPage = {
  name: string;
  questions: Record<string, SurveyQuestion>;
};

export type SurveyQuestion = {
  question: string;
  answers?: Record<string, SurveyAnswer>;
};

export type SurveyAnswer = {
  answer: string;
  dateCreate: string;
};
