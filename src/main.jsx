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
import ManageProperties from "./pages/ManageProperties";
import ManageUsers from "./pages/ManageUsers";
import ManageReviews from "./pages/ManageReviews";
import MySoldProperties from "./pages/MySoldProperties";
import MyRequestedProperties from "./pages/MyRequestedProperties";
import AddProperty from "./pages/AddProperty";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { HelmetProvider } from "react-helmet-async";
import MyAddedProperties from "./pages/MyAddedProperties";
import UpdateProperty from "./pages/UpdateProperty";
import PropertyDetails from "./pages/PropertyDetails";
import MakeAnOffer from "./pages/MakeAnOffer";
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
      {
        path: "/properties/:id",
        element: <PropertyDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // user,admin,agent profile
      {
        path: "/dashboard",
        element: <Navigate to="/dashboard/profile" replace={true} />,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile />,
      },
      // user
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
      {
        path: "/dashboard/offer/:propertyId",
        element: <MakeAnOffer />,
      },
      //admin
      {
        path: "/dashboard/manage-properties",
        element: <ManageProperties />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUsers />,
      },
      {
        path: "/dashboard/manage-reviews",
        element: <ManageReviews />,
      },
      // agent
      {
        path: "/dashboard/add-property",
        element: <AddProperty />,
      },
      {
        path: "/dashboard/my-added-properties",
        element: <MyAddedProperties />,
      },
      {
        path: "/dashboard/my-sold-properties",
        element: <MySoldProperties />,
      },
      {
        path: "/dashboard/my-requested-properties",
        element: <MyRequestedProperties />,
      },
      {
        path: "/dashboard/properties/:id/edit",
        element: <UpdateProperty />,
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
