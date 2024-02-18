import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Tasks from "../Views/Tasks";
import Task from "../Views/Tasks/Task";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Tasks />,
  },
  {
    path: "/task/:roomId/:taskID",
    element: <Task />,
  },
]);
