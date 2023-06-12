export interface AppContextState {
  auth: {
    loggedIn: boolean;
    userId?: number;
  };
}
