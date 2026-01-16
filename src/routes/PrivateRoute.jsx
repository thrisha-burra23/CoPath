import { useQuery } from "@tanstack/react-query";
import AppwriteAccount from "../appwrite/AuthServices";
import { Navigate, Outlet } from "react-router-dom";

const appwriteAccount = new AppwriteAccount();

const PrivateRoute = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => appwriteAccount.getUser(),
    retry: false,
  });

  if (isLoading) {
    return <Outlet context={{ authLoading: true }} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerification) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ authLoading: false, user }} />;
};

export default PrivateRoute;
