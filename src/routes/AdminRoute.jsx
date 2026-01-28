import React from "react";
import { useAuthUser } from "../reactQuery/authHooks";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, isLoading } = useAuthUser();

  if (isLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
