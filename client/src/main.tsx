import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLanding, NavigationHeader } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLanding />,
  },
]);

root.render(
  <React.StrictMode>
    <div>
      {/* App Context */}
      <NavigationHeader />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
