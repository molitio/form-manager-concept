import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Survey, SurveyStoreState } from "../../types";

const initialState: SurveyStoreState = {
  survey: {},
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setNewSurvey: (state, action: PayloadAction<Survey>) => {
      state.survey.newSurvey = action.payload;
      console.log("action payload", action.payload);
    },
  },
});

export const surveyReducer = surveySlice.reducer;

export const { setNewSurvey } = surveySlice.actions;
