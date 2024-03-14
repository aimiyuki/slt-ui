import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles.ts";

import App from "./components/App.tsx";
import Home from "./components/Home.tsx";
import Algorithm from "./components/Algorithm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <Algorithm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />

    <RouterProvider router={router} />
  </React.StrictMode>
);
