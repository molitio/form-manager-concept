import React from "react";
import {
  StyledSurveyListButton,
  StyledHeader,
  StyledSurveyControls,
  StyledSurveyList,
  StyledSurveyListItem,
  StyledSurveyName,
  StyledSurveys,
} from "../styled";
import { useSelector } from "react-redux";
import { AppConfig, RootState, setSuveyCollection } from "../context";
import { useDispatch } from "react-redux";
import { deleteSurvey, getSurveyWithLimits } from "../services";
import SurveyDate from "./SurveyDate";
import { useNavigate } from "react-router-dom";

const Surveys: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const surveyCollection = useSelector(
    (state: RootState) => state.survey.surveyCollection
  );

  const authenticatedUser = useSelector(
    (state: RootState) => state?.auth?.user?.authenticatedUser
  );

  const [copyToClipboard, setCopyToClipboard] = React.useState({
    active: false,
    id: 0,
  });

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
    };

    removeSurvey();
  };

  const handleCopyToClipboard = (hash: string, id: number) => {
    if (hash.length <= 0 || id <= 0) return;
    if (typeof document !== "undefined") {
      navigator.clipboard.writeText(
        `${AppConfig.appUrl}${AppConfig.surveyPath}/${hash}`
      );
      setCopyToClipboard({
        active: true,
        id: id,
      });
      handleCloseCheck();
    }
  };

  const handleCloseCheck = () => {
    setTimeout(() => {
      setCopyToClipboard({ active: false, id: 0 });
    }, 1500);
  };

  const navigateToSurveyEdit = (surveyId: number) => {
    navigate(`${AppConfig.editSurveysPath}/${surveyId}`);
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
              <StyledSurveyListButton onClick={() => () => {}}>
                <span role="img" aria-label="Text Bubble">
                  💬
                </span>
              </StyledSurveyListButton>
              <StyledSurveyListButton
                onClick={() =>
                  handleCopyToClipboard(survey.hash ?? "", survey.id ?? 0)
                }
              >
                {copyToClipboard.active && copyToClipboard.id === survey.id ? (
                  <span role="img" aria-label="Confirm Copy">
                    ✅
                  </span>
                ) : (
                  <span role="img" aria-label="Copy">
                    📋
                  </span>
                )}
              </StyledSurveyListButton>
              <StyledSurveyListButton
                onClick={() => navigateToSurveyEdit(survey.id ?? 0)}
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
