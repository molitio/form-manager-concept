import React from "react";
import { StyledHeader, StyledSurveys } from "../styled";
import { Outlet } from "react-router-dom";

const Surveys: React.FC = () => {
  return (
    <StyledSurveys>
      <Outlet />
      <StyledHeader>Surveys</StyledHeader>
    </StyledSurveys>
  );
};

export default Surveys;
