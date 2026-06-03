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
import Cart from "./routes/cart";
import Product from "./routes/product";
import Register from "./routes/register";
import Login from "./routes/login";
import Profile from "./routes/profile";
import Account from "./routes/account";

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
            path: "product/:productId",
            element: <Product />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "profile",
            element: <Profile />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "account",
                element: <Account />,
              },
            ],
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
