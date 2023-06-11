import React from "react";
import ReactDOM from "react-dom/client";
import { AppLanding, AppShell } from "./components";
import { AppContextStoreProvider } from "./context";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const rootRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <AppLanding />,
      },
    ],
  },
];

const rootRouter = createBrowserRouter(rootRoutes);

root.render(
  <React.StrictMode>
    <AppContextStoreProvider>
      <AppShell />
    </AppContextStoreProvider>
  </React.StrictMode>
);
