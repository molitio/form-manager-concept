export type SubmitSurveyResult = "Resolved" | "Rejected" | "Error";

export type SurveyLimits = {
  userId: number;
  skip: number;
  limit: number;
};
