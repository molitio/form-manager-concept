import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  Survey,
  SurveyPage,
  SurveyStoreState,
  SurveyQuestion,
} from "../../types";

const initialState: SurveyStoreState = {};

const parseSurveyInput = (input: string): Survey | null => {
  const lines = input.trim().split("\n");

  if (lines.length < 3) {
    // Invalid input, must have at least 3 lines
    return null;
  }

  const name = lines[0].trim();
  const surveyPages: Record<number, SurveyPage> = {};

  let currentPageId: number | null = null;
  let currentPage: SurveyPage | null = null;
  let questionIndex = 1;
  let currentPageIdCounter = 1;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "") {
      // Empty line indicates a new survey page
      const pageName = lines[i + 1].trim();

      if (currentPageId && currentPage) {
        surveyPages[currentPageId] = currentPage;
      }

      currentPageId = currentPageIdCounter;
      currentPageIdCounter++;
      currentPage = {
        name: pageName,
        questions: {},
      };

      i++; // Skip the next line as it is the page name
      questionIndex = 1; // Reset question index for the new page
    } else {
      // Non-empty line indicates a question
      if (currentPageId && currentPage) {
        const question: SurveyQuestion = {
          question: line,
        };

        currentPage.questions[questionIndex] = question;
        questionIndex++;
      }
    }
  }

  if (currentPageId && currentPage) {
    surveyPages[currentPageId] = currentPage;
  }

  console.log("survey: ", {
    name,
    content: {
      surveyPages,
    },
  });

  return {
    name,
    content: {
      surveyPages,
    },
  };
};
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
        state.selectedSurvey = parsedSurvey;
      }
    },
  },
});

export const surveyReducer = surveySlice.reducer;

export const { setSelectedSurvey } = surveySlice.actions;
export const { setSelectedSurveyFromInput } = surveySlice.actions;
