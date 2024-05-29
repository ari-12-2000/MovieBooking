// ProtectedRoute.jsx
import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, requireAdmin }) => {
  let isUserLoggedIn = false,
    isAdminLoggedIn = false;
  const userId = localStorage.getItem("userId");
  const adminId = localStorage.getItem("adminId");
  if (userId) {
    isUserLoggedIn = true;
  } else if (adminId) {
    isAdminLoggedIn = true;
  }

  if (requireAdmin && !isAdminLoggedIn) {
    return <Navigate to="/admin" />;
  }

  if (!requireAdmin && !isUserLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
