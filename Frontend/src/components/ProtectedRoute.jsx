// ProtectedRoute.jsx
import React, { useEffect } from "react";

import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, requireAdmin }) => {

  const userId = localStorage.getItem("userId");
  const adminId = localStorage.getItem("adminId");

 
  

  if (requireAdmin && !adminId) {
    return <Navigate to="/admin" />;
  }

  if (!requireAdmin && !userId && !adminId ) {
  
    return <Navigate to="/auth" />;
  }
 else if(!requireAdmin && !userId && adminId)
     return  <Navigate to="/error" />
 

  return children;
};

export default ProtectedRoute;
