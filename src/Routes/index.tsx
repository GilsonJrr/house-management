import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Tasks from "../Views/Tasks";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
  },
]);
