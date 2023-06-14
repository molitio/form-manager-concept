import { Survey } from "./Survey";
import { AuthenticatedUser } from "./User";

export type AuthStoreState = {
  user: {
    loggedIn: boolean;
    authenticatedUser?: AuthenticatedUser;
  };
};

export type SurveyStoreState = {
  survey: {
    newSurvey?: Survey;
    surveyCollection?: Record<string, Survey>;
  };
};
