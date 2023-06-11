import React, { useState } from "react";
import { StyledAppShell, StyledGlobal } from "../styled";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLanding from "./AppLanding";
import { useSelector, useDispatch } from "react-redux";
import NavigationHeader from "./NavigationHeader";
import { AppContextState, setLoggedIn } from "../context";

const AppShell: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  const loggedIn = useSelector(
    (state: AppContextState) => state?.auth?.loggedIn
  );

  const [loggedInState, setLoggedInState] = useState(false);

  React.useEffect(() => {
    dispatch(setLoggedIn(loggedInState));
  }, [loggedInState]);

  const dispatch = useDispatch();

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <AppLanding />,
    },
    {
      path: "/auth",
      element: loggedInState ? <>logged in</> : <>not logged in</>,
    },
  ];

  const router = createBrowserRouter([...routes]);

  const handleMockLogin = () => {
    setLoggedInState(true);
    console.log("logged in state", loggedInState);
  };
  const handleMockLogout = () => {
    setLoggedInState(false);
    console.log("logged in state", loggedInState);
  };

  return (
    <StyledAppShell>
      <NavigationHeader />
      <button onClick={handleMockLogin}>login mock</button>
      <button onClick={handleMockLogout}>logout mock</button>
      <RouterProvider router={router} />
      <StyledGlobal />
    </StyledAppShell>
  );
};

export default AppShell;
