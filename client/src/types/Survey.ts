export type Survey = {
  name: string;
  content: {
    [key: string]: SurveyPage;
  };
};

export type SurveyPage = {
  [key: string]: string;
};
