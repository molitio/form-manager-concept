import React from "react";
import { StyledAppShell, StyledGlobal } from "../styled";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { RootState, routeMap } from "../context";
import AppLanding from "./AppLanding";
import NavigationHeader from "./NavigationHeader";
import Login from "./Login";
import Register from "./Register";
import Surveys from "./Surveys";
import ErrorPage from "./ErrorPage";
import Logout from "./Logout";
import Responses from "./Responses";
import { useSelector } from "react-redux";

const AppShell: React.FC = () => {
  const loggedIn = useSelector(
    (state: RootState) => state.auth?.user?.loggedIn
  );
  return (
    <StyledAppShell>
      <BrowserRouter>
        <NavigationHeader />
        <Routes>
          <Route
            path={routeMap["root"].href}
            element={<AppLanding />}
            errorElement={<ErrorPage />}
          />
          <Route path={routeMap["login"].href} element={<Login />} />
          <Route path={routeMap["register"].href} element={<Register />} />
          {loggedIn ? (
            <>
              <Route path={routeMap["surveys"].href} element={<Surveys />} />
              <Route
                path={routeMap["responses"].href}
                element={<Responses />}
              />
              <Route path={routeMap["logout"].href} element={<Logout />} />
            </>
          ) : (
            <></>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <StyledGlobal />
    </StyledAppShell>
  );
};

export default AppShell;
