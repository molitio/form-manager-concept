import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { appReducer } from "../types";

const rootReducer = combineReducers({
  app: appReducer,
});

export const appStore = configureStore({
  reducer: rootReducer,
});

export type AppContextStoreDispatch = typeof appStore.dispatch;
