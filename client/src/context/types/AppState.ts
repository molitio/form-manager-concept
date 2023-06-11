import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppContextState {
  auth: {
    loggedIn: boolean;
  };
}

const initialState: AppContextState = {
  auth: {
    loggedIn: false,
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.auth.loggedIn = action.payload;
      console.log("action payload", action.payload);
    },
  },
});

export const { setLoggedIn } = appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;
