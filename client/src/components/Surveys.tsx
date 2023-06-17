import React from "react";
import {
  StyledSurveyListButton,
  StyledHeader,
  StyledSurveyControls,
  StyledSurveyList,
  StyledSurveyListItem,
  StyledSurveyName,
  StyledSurveys,
  StyleSurveyDate,
} from "../styled";
import { useSelector } from "react-redux";
import { RootState, setSuveyCollection } from "../context";
import { useDispatch } from "react-redux";
import { deleteSurvey, getSurveyWithLimits } from "../services";
import SurveyDate from "./SurveyDate";

const Surveys: React.FC = () => {
  const dispatch = useDispatch();
  const surveyCollection = useSelector(
    (state: RootState) => state.survey.surveyCollection
  );

  const authenticatedUser = useSelector(
    (state: RootState) => state?.auth?.user?.authenticatedUser
  );

  const handleUpdateSurveyList = async () => {
    const getSurveys = async () => {
      const surveyCollection = await getSurveyWithLimits(
        { userId: authenticatedUser?.id ?? 0, skip: 0, limit: 10 },
        authenticatedUser?.accessToken ?? ""
      );

      dispatch(setSuveyCollection(surveyCollection));
    };

    getSurveys();
  };

  React.useEffect(() => {
    handleUpdateSurveyList();
  }, []);

  React.useEffect(() => {}, [surveyCollection, authenticatedUser]);

  const handleDelete = (id: number) => {
    if (id <= 0) return;

    const removeSurvey = async () => {
      const deleteResponse = await deleteSurvey(
        id,
        authenticatedUser?.accessToken ?? ""
      );

      if (deleteResponse === "Resolved") {
        handleUpdateSurveyList();
      }

      console.log("delete result", deleteResponse);
    };

    removeSurvey();
  };

  return (
    <StyledSurveys>
      <StyledHeader>Surveys</StyledHeader>
      <StyledSurveyList>
        <StyledSurveyListItem key={"header"}>
          <StyledSurveyName>Name:</StyledSurveyName>
          <StyledSurveyControls>Actions</StyledSurveyControls>
        </StyledSurveyListItem>
        {surveyCollection?.map((survey) => (
          <StyledSurveyListItem key={survey.id}>
            <SurveyDate dateNumber={survey.createdAt ?? 0} />
            <StyledSurveyName>{survey.name}</StyledSurveyName>

            <StyledSurveyControls>
              <StyledSurveyListButton
                onClick={() => handleDelete(survey.id ?? 0)}
              >
                <span role="img" aria-label="Text Bubble">
                  💬
                </span>
              </StyledSurveyListButton>
              <StyledSurveyListButton
                onClick={() => handleDelete(survey.id ?? 0)}
              >
                <span role="img" aria-label="Copy">
                  📋
                </span>
              </StyledSurveyListButton>
              <StyledSurveyListButton
                onClick={() => handleDelete(survey.id ?? 0)}
              >
                <span role="img" aria-label="Edit">
                  ✏️
                </span>
              </StyledSurveyListButton>
              <StyledSurveyListButton
                onClick={() => handleDelete(survey.id ?? 0)}
              >
                <span role="img" aria-label="Delete">
                  🗑️
                </span>
              </StyledSurveyListButton>
            </StyledSurveyControls>
          </StyledSurveyListItem>
        ))}
      </StyledSurveyList>
    </StyledSurveys>
  );
};

export default Surveys;
