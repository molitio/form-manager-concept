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
import Pagination from "./Pagination";

// display paging

const pageSizeCollection = [0, 5, 10, 15, 25, 50, 100, 200];

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

  const [paging, setPaging] = React.useState({
    skip: 5,
    limit: 10,
  });

  const handleUpdateSurveyList = async (skip: number, limit: number) => {
    setPaging({ skip: skip, limit: limit });
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
    handleUpdateSurveyList(paging.skip, paging.limit);
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
        handleUpdateSurveyList(paging.skip, paging.limit);
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

  const handlePageChange = (skip: number, limit: number) => {
    /*      const pages = Math.ceil(total / pageSize);
     const currentPage = skip / pageSize + 1;
     
     pageSizeCollection[selectedPageIndex]
     
     */
    console.log("handlePageChange");
    handleUpdateSurveyList(skip, limit);
  };

  const handleCloseCheck = () => {
    setTimeout(() => {
      setCopyToClipboard({ active: false, id: 0 });
    }, 1500);
  };

  const navigateToSurveyEdit = (surveyId: number) => {
    navigate(`${AppConfig.editSurveysPath}/${surveyId}`);
  };

  console.log("surveys total: ", surveyCollection?.length);

  console.log("paging limit: ", paging.limit);
  console.log("paging skip: ", paging.skip);

  return (
    <StyledSurveys>
      <StyledHeader>Surveys</StyledHeader>
      <StyledSurveyList>
        <StyledSurveyListItem key={"header"}>
          <StyledSurveyName>Name:</StyledSurveyName>
          <StyledSurveyControls>Actions</StyledSurveyControls>
        </StyledSurveyListItem>
        <StyledSurveyListItem key={"pagination"}>
          <Pagination
            pageSizeCollection={pageSizeCollection}
            handlePageChange={handlePageChange}
            totalNumberOfSurveys={surveyCollection?.length ?? 0}
          />
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
        {/*       <Pagination
          pageSizeCollection={pageSizeCollection}
          handlePageChange={handlePageChange}
        /> */}
      </StyledSurveyList>
    </StyledSurveys>
  );
};

export default Surveys;
