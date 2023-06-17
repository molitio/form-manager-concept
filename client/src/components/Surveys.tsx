import React from "react";
import { StyledHeader, StyledSurveys } from "../styled";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, setSuveyCollection } from "../context";
import { useDispatch } from "react-redux";
import { getSurveyWithLimits } from "../services";

const Surveys: React.FC = () => {
  const dispatch = useDispatch();
  const surveyCollection = useSelector(
    (state: RootState) => state.survey.surveyCollection
  );

  const authenticatedUser = useSelector(
    (state: RootState) => state?.auth?.user?.authenticatedUser
  );

  React.useEffect(() => {
    const getSurveys = async () => {
      const surveyCollection = await getSurveyWithLimits(
        { userId: authenticatedUser?.id ?? 0, skip: 0, limit: 10 },
        authenticatedUser?.accessToken ?? ""
      );

      dispatch(setSuveyCollection(surveyCollection));
    };

    getSurveys();
  }, []);

  React.useEffect(() => {}, [surveyCollection, authenticatedUser]);

  return (
    <StyledSurveys>
      <Outlet />
      <StyledHeader>Surveys</StyledHeader>
      {surveyCollection?.map((survey) => (
        <>
          name: {survey.name}
          <br />
        </>
      ))}
    </StyledSurveys>
  );
};

export default Surveys;
