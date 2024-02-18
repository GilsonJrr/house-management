import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./libs/styled-componets/globalStyle";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);
