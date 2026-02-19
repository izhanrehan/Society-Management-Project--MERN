import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // You can check for a specific key, e.g., "token" or "user"
  const isAuthenticated = !!localStorage.getItem("token"); // Change "token" to your key

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;