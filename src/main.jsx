import React from "react";
import ReactDOM from "react-dom/client";
import Registration from "./pages/Registration";

import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthProvider";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import AllProperties from "./pages/AllProperties";
import DashboardLayout from "./layouts/DashboardLayout";
import MyProfile from "./pages/MyProfile";
import WishList from "./pages/WishList";
import PropertyBrought from "./pages/PropertyBrought";
import MyReviews from "./pages/MyReviews";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/properties",
        element: <AllProperties />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Navigate to="/dashboard/profile" />,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/wishlist",
        element: <WishList />,
      },
      {
        path: "/dashboard/properties",
        element: <PropertyBrought />,
      },
      {
        path: "/dashboard/reviews",
        element: <MyReviews />,
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);
