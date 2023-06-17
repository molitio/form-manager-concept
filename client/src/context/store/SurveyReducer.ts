import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Survey, SurveyStoreState } from "../../types";
import { parseSurveyInput } from "../../services";

const initialState: SurveyStoreState = {};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setSelectedSurvey: (state, action: PayloadAction<Survey>) => {
      if (state.selectedSurvey) {
        state.selectedSurvey = action.payload;
      }
      console.log("action payload", action.payload);
    },
    setSelectedSurveyFromInput: (state, action: PayloadAction<string>) => {
      console.log("payload", action.payload);
      if (!action.payload) {
        return;
      }

      const parsedSurvey = parseSurveyInput(action.payload);
      if (parsedSurvey) {
        state.selectedSurvey = { ...parsedSurvey };
      }
    },
    setSuveyCollection: (state, action: PayloadAction<Survey[]>) => {
      console.log("payload", action.payload);

      state.surveyCollection = action.payload;
    },
  },
});

export const surveyReducer = surveySlice.reducer;

export const { setSelectedSurvey } = surveySlice.actions;
export const { setSelectedSurveyFromInput } = surveySlice.actions;
export const { setSuveyCollection } = surveySlice.actions;
