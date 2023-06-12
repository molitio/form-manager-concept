import {
  PayloadAction,
  combineReducers,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { AppContextState, AuthenticatedUser } from "../../types";

const initialState: AppContextState = {
  user: {
    loggedIn: false,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.user.loggedIn = action.payload;
      console.log("action payload", action.payload);
    },
    setUser: (state, action: PayloadAction<AuthenticatedUser>) => {
      state.user.authenticatedUser = action.payload;
      console.log("action payload", action.payload);
    },
  },
});

const authReducer = authSlice.reducer;

const rootReducer = combineReducers({
  auth: authReducer,
});

export const { setLoggedIn } = authSlice.actions;
export const { setUser } = authSlice.actions;

export const appStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppContextStoreDispatch = typeof appStore.dispatch;
