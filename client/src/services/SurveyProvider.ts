import { AppConfig } from "../context";
import { Survey, SurveyPage, SurveyQuestion } from "../types";
import { PromiseResult, SurveyLimits } from "./types";

export const submitSurvey: (
  token: string,
  survey?: Survey
) => Promise<PromiseResult> = async (token: string, survey?: Survey) => {
  if (!survey) return "Rejected";
  const surveyString = JSON.stringify({
    name: survey.name,
    content: survey.content,
  });

  console.log("survey string: ", surveyString);

  try {
    const fetchResult = await fetch(
      `${AppConfig.apiRootUrl}${AppConfig.apiSurveysPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: surveyString,
      }
    );

    const result = await fetchResult.json();
    console.log("result: ", result);

    if (result.id > 0) {
      return "Resolved";
    }

    return "Rejected";
  } catch (error) {
    console.error("Error", error);
    return "Error";
  }
};

export const getSurveyWithLimits: (
  limits: SurveyLimits,
  token: string
) => Promise<Survey[]> = async (limit: SurveyLimits, token: string) => {
  try {
    const fetchResult = await fetch(
      `${AppConfig.apiRootUrl}${AppConfig.apiSurveysPath}?userId=${limit.userId}&$skip=${limit.skip}&$limit=${limit.limit}&$sort[createdAt]=-1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await fetchResult.json();
    console.log("result: ", result);

    if (result.data.length > 0) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Error", error);
    return [];
  }
};

export const deleteSurvey: (
  id: number,
  token: string
) => Promise<PromiseResult> = async (id: number, token: string) => {
  if (!id || id <= 0) return "Rejected";
  try {
    const fetchResult = await fetch(
      `${AppConfig.apiRootUrl}${AppConfig.apiSurveysPath}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await fetchResult.json();
    console.log("result: ", result);

    if (result.id > 0) {
      return "Resolved";
    }

    return "Rejected";
  } catch (error) {
    console.error("Error", error);
    return "Error";
  }
};

export const isSurveyValid = (survey?: Survey): boolean => {
  if (!survey) {
    return false;
  }
  // Check if the survey has a non-empty name
  if (survey.name.trim().length === 0) {
    return false;
  }

  // Check if the survey has at least one page
  const pageIds = Object.keys(survey.contentObject?.surveyPages ?? {});
  if (pageIds.length === 0) {
    return false;
  }

  // Check if each page has a non-empty name and at least one question
  for (const pageId of pageIds) {
    const page = survey.contentObject?.surveyPages?.[pageId];
    if (page && page.name.trim().length === 0) {
      return false;
    }

    const questionNumbers = Object.keys(page?.questions ?? {});
    if (questionNumbers.length === 0) {
      return false;
    }

    // Check if each question has a non-empty question string
    for (const questionNumber of questionNumbers) {
      const question = page?.questions[parseInt(questionNumber)];
      if (question && question.question.trim().length === 0) {
        return false;
      }
    }
  }

  // If all checks pass, the survey is valid
  return true;
};

export const parseSurveyInput = (input: string): Survey | null => {
  const lines = input.trim().split("\n");
  if (lines.length === 0) {
    return {
      name: "",
    };
  }

  const name = lines[0].trim();
  const surveyPages: Record<number, SurveyPage> = {};

  let currentPageId: number | null = null;
  let currentPage: SurveyPage | null = null;
  let questionIndex = 1;
  let currentPageIdCounter = 1;

  if (lines.length < 3) {
    return {
      name,
      contentObject: {
        surveyPages,
      },
    };

    // Invalid input, must have at least 3 lines
    /*  return null; */
  }

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
    content: input,
    contentObject: {
      surveyPages,
    },
  });

  return {
    name,
    content: input,
    contentObject: {
      surveyPages,
    },
  };
};
