import { useSelector } from "react-redux";
import { AppConfig, RootState } from "../context";
import { Survey } from "../types";

type SubmitSurveyResult = "Resolved" | "Rejected" | "Error";

export const SubmitSurvey: (
  token: string,
  survey?: Survey
) => Promise<SubmitSurveyResult> = async (token: string, survey?: Survey) => {
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
