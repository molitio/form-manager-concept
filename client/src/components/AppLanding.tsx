import React from "react";
import {
  StyledAppLanding,
  StyledAppLandingInfoText,
  StyledAppLandingTitle,
} from "../styled";
import RedirectLink from "./RedirectLink";

export const AppLanding: React.FC = () => {
  return (
    <StyledAppLanding>
      <StyledAppLandingTitle>
        Üdvözöllek a Kérdőivek alkalmazásban.
      </StyledAppLandingTitle>
      <StyledAppLandingInfoText>
        Kérdőívek készítéséhez és kezeléséhez kérjük jelentkezz be.
        <RedirectLink url="/login">Login</RedirectLink>
      </StyledAppLandingInfoText>
    </StyledAppLanding>
  );
};

export default AppLanding;
