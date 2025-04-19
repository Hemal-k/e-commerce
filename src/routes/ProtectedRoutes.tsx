import React from "react";
import { getCurrentUser } from "../utils/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, role }) => {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;
