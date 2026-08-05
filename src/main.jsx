import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./routes/index";
import Help from "./routes/help";
import Shop from "./routes/shop";
import Cart from "./routes/cart";
import Product from "./routes/product";
import Register from "./routes/register";
import Login from "./routes/login";
import Profile from "./routes/profile";
import Account from "./routes/account";
import Rewards from "./routes/rewards";
import Orders from "./routes/orders";
import Checkout from "./routes/checkout";
import Order from "./routes/order";
import About from "./routes/about";
import Contact from "./routes/contact";
import Faq from "./routes/faq";
import Press from "./routes/press";
import News from "./routes/news";
import Terms from "./routes/terms";
import Privacy from "./routes/privacy";

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
            path: "about",
            element: <About />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "faq",
            element: <Faq />,
          },
          {
            path: "press",
            element: <Press />,
          },
          {
            path: "news",
            element: <News />,
          },
          {
            path: "terms",
            element: <Terms />,
          },
          {
            path: "privacy",
            element: <Privacy />,
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
            path: "checkout",
            element: <Checkout />,
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
              {
                path: "rewards",
                element: <Rewards />,
              },
              {
                path: "orders",
                element: <Orders />,
              },
              {
                path: "orders/:orderNumber",
                element: <Order />,
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
