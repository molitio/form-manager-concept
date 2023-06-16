import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Survey, SurveyPage, SurveyStoreState } from "../../types";

const initialState: SurveyStoreState = {};

type SurveyPageByKey = { key: number; page: SurveyPage };

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
    setSelectedSurveyName: (state, action: PayloadAction<string>) => {
      console.log("action: ", action);
      if (state.selectedSurvey) {
        state.selectedSurvey.name = action.payload;
      } else {
        state.selectedSurvey = {
          name: action.payload,
          content: {
            surveyPages: {},
          },
        };
      }
    },
    //rename to match above
    setNewPage: (state, action: PayloadAction<SurveyPageByKey>) => {
      console.log("action: ", action);

      if (state.selectedSurvey) {
        const selectedPage = (state.selectedSurvey.content.surveyPages[
          action.payload?.key
        ] = action.payload.page);
      }
    },
  },
});

export const surveyReducer = surveySlice.reducer;

export const { setSelectedSurvey } = surveySlice.actions;
export const { setSelectedSurveyName } = surveySlice.actions;
export const { setNewPage } = surveySlice.actions;
