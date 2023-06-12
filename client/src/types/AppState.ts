import { AuthenticatedUser } from "./User";

export interface AppContextState {
  user: {
    loggedIn: boolean;
    authenticatedUser?: AuthenticatedUser;
  };
}
