export type Survey = {
  name: string;
  content: {
    [key: string]: SurveyPage;
  };
};

export type SurveyPage = {
  name: string;
  questions: {
    [key: string]: SurveyQuestion;
  };
};

export type SurveyQuestion = {
  question: string;
  answer?: string;
};
