import React from "react";
import { StyledAppShell, StyledGlobal } from "../styled";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { routeMap } from "../context";
import AppLanding from "./AppLanding";
import NavigationHeader from "./NavigationHeader";
import Login from "./Login";
import Register from "./Register";
import Surveys from "./Surveys";
import ErrorPage from "./ErrorPage";

const AppShell: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: routeMap["root"].href,
      element: <AppLanding />,
      errorElement: <ErrorPage />,
    },
    {
      path: routeMap["login"].href,
      element: <Login />,
    },
    {
      path: routeMap["register"].href,
      element: <Register />,
    },
    {
      path: routeMap["surveys"].href,
      element: <Surveys />,
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
