import React from "react";
import { useAuthUser } from "../reactQuery/authHooks";
import { Navigate, Outlet } from "react-router-dom";
import { useProfile } from "../reactQuery/profileHooks";

const AdminRoute = () => {
  const { data:user, isLoading:userLoading } = useAuthUser();
  const {data:profile,isLoading:profileLoading}=useProfile(user?.$id)

  if (userLoading || profileLoading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (profile?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
