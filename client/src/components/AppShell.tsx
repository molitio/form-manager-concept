import React from "react";
import { StyledAppShell, StyledGlobal } from "../styled";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import AppLanding from "./AppLanding";
import NavigationHeader from "./NavigationHeader";
import Login from "./Login";
import { routeMap } from "../context";
import Register from "./Register";

const AppShell: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: routeMap["root"].href,
      element: <AppLanding />,
    },
    {
      path: routeMap["login"].href,
      element: <Login />,
    },
    {
      path: routeMap["register"].href,
      element: <Register />,
    },
  ];

  const router = createBrowserRouter([...routes]);

  return (
    <StyledAppShell>
      <NavigationHeader />
      <RouterProvider router={router} />
      <StyledGlobal />
    </StyledAppShell>
  );
};

export default AppShell;
