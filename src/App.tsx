import "#resources/css/App.css";
import "#resources/css/index.css";

import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LandingPage } from "#features/LandingPage";
import { Daily } from "#features/Daily";
import { GridLayout } from "./app/components/GridLayout/GridLayout";
import { Hasher } from "#features/Hasher";
import { NotFound } from "#features/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/daily/*",
    element: <Daily />
  },
  {
    path: "/pepegpt/*",
    element: <Hasher />
  },
  {
    path: "/layout-test/*",
    element: <GridLayout></GridLayout>
  },
  {
    path: "*",
    element: <NotFound />
  }
]);


const App: FC = () => {
  return (
    <div
      style={{
        width: "950px",
        minHeight: "500px",
        margin: "120px auto 0 auto",
      }}
    >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
