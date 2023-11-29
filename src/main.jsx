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
import AdvertiseProperty from "./pages/AdvertiseProperty";
import PrivateRoutes from "./components/PrivateRoutes";
import AdminRoute from "./components/AdminRoute";
import AgentRoute from "./components/AgentRoute";
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
        element: (
          <PrivateRoutes>
            <AllProperties />
          </PrivateRoutes>
        ),
      },
      {
        path: "/properties/:id",
        element: (
          <PrivateRoutes>
            <PropertyDetails />
          </PrivateRoutes>
        ),
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
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
      // user
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoutes>
            <WishList />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/properties",
        element: (
          <PrivateRoutes>
            <PropertyBrought />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: (
          <PrivateRoutes>
            <MyReviews />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/offer/:propertyId",
        element: (
          <PrivateRoutes>
            <MakeAnOffer />
          </PrivateRoutes>
        ),
      },
      //admin
      {
        path: "/dashboard/manage-properties",
        element: (
          <AdminRoute>
            <ManageProperties />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/advertise-property",
        element: (
          <AdminRoute>
            <AdvertiseProperty />
          </AdminRoute>
        ),
      },
      // agent
      {
        path: "/dashboard/add-property",
        element: (
          <AgentRoute>
            <AddProperty />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/my-added-properties",
        element: (
          <AgentRoute>
            <MyAddedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/my-sold-properties",
        element: (
          <AgentRoute>
            <MySoldProperties />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/my-requested-properties",
        element: (
          <AgentRoute>
            <MyRequestedProperties />
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/properties/:id/edit",
        element: (
          <AgentRoute>
            <UpdateProperty />
          </AgentRoute>
        ),
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
