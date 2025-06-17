import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./globalcss/index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MusicOutput from "./pages/MusicOutput.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import MusicGenerator from "./pages/MusicGenerator.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/generate", element: <MusicGenerator /> },
  { path: "/output", element: <MusicOutput /> },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
