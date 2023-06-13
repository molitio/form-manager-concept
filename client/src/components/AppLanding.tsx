import React from "react";
import {
  StyledAppLanding,
  StyledAppLandingInfoText,
  StyledAppLandingTitle,
} from "../styled";

export const AppLanding: React.FC = () => {
  return (
    <StyledAppLanding>
      <StyledAppLandingTitle>
        Üdvözöllek a Kérdőivek alkalmazásban.
      </StyledAppLandingTitle>
      <StyledAppLandingInfoText>
        Kérdőívek készítéséhez és kezeléséhez kérjük jelentkezz be.
      </StyledAppLandingInfoText>
    </StyledAppLanding>
  );
};

export default AppLanding;
