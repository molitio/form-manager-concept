import React from "react";
import ReactDOM from "react-dom/client";
import { useSelector, useDispatch } from "react-redux";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { AppLanding, Layout } from "./components";
import { AppContextState } from "./context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLanding />,
  },
  {
    path: "/auth",
    element: <>logged in</>,
  },
];

const router = createBrowserRouter([...routes]);

root.render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
