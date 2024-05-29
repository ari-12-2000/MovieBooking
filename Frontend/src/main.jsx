import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Movies from "./components/Movies/Movies.jsx";
import Admin from "./components/Auth/Admin.jsx";
import Auth from "./components/Auth/Auth.jsx";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store";
import Booking from "./components/Bookings/Booking.jsx";
import UserProfile from "./Profiles/UserProfile.jsx";
import AdminProfile from "./Profiles/AdminProfile.jsx";
import AddMovie from "./components/Movies/AddMovie.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // import the protected route component

axios.defaults.baseURL = "http://localhost:5000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <Movies /> },
      { path: "/admin", element: <Admin /> },
      {
        path: "/add",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AddMovie />
          </ProtectedRoute>
        ),
      },
      { path: "/auth", element: <Auth /> },
      {
        path: "/booking/:id",
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin-profile",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminProfile />
          </ProtectedRoute>
        ),
      },
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
