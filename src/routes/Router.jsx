import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// pages
import Home from "../pages/Home";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// components
import PrivateRoute from "../components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // =====================
      // PUBLIC ROUTES
      // =====================
      { index: true, element: <Home /> },

      { path: "services", element: <Services /> },

      // 🔴 FIXED: slug based route
      { path: "service/:service_slug", element: <ServiceDetails /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // =====================
      // PRIVATE ROUTES (USER)
      // =====================
      {
        path: "booking/:service_slug",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },

      {
        path: "my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      // =====================
      // PRIVATE ROUTES (ADMIN)
      // =====================
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },

  // =====================
  // 404
  // =====================
  {
    path: "*",
    element: <NotFound />,
  },
]);
