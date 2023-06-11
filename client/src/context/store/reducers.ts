import {
  PayloadAction,
  combineReducers,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { AppContextState } from "../types";

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

const appReducer = appSlice.reducer;

const rootReducer = combineReducers({
  app: appReducer,
});

export const { setLoggedIn } = appSlice.actions;

export const appStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppContextStoreDispatch = typeof appStore.dispatch;
