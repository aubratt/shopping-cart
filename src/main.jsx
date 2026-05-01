import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./routes/index";
import Company from "./routes/company";
import Help from "./routes/help";
import Shop from "./routes/shop";
import Account from "./routes/account";
import Cart from "./routes/cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "company/:page",
            element: <Company />,
          },
          {
            path: "help/:page",
            element: <Help />,
          },
          {
            path: "shop/:category",
            element: <Shop />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
