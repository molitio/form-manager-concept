import React from "react";
import {
  StyledNavigationBrandText,
  StyledNavigationHeader,
  StyledNavigationLink,
  StyledNavigationRoute,
  StyledNavigationRouteCollection,
} from "../styled";
import { useSelector } from "react-redux";
import { RootState, displayRoute, routeMap } from "../context";

const NavigationHeader: React.FC = () => {
  const loggedIn = useSelector(
    (state: RootState) => state?.app?.auth?.loggedIn
  );

  return (
    <StyledNavigationHeader>
      <StyledNavigationBrandText href="/">
        📓 Kérdőívek
      </StyledNavigationBrandText>
      <StyledNavigationRouteCollection>
        {Object.entries(routeMap).map((route, i) =>
          displayRoute(route[1], loggedIn) ? (
            <StyledNavigationRoute key={i}>
              <StyledNavigationLink href={route[1].href}>
                {route?.[1].displayText}
              </StyledNavigationLink>
            </StyledNavigationRoute>
          ) : (
            ""
          )
        )}
      </StyledNavigationRouteCollection>
    </StyledNavigationHeader>
  );
};

export default NavigationHeader;
