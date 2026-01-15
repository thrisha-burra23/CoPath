import { useQuery } from "@tanstack/react-query";
import AppwriteAccount from "../appwrite/AuthServices";
import { Navigate, Outlet } from "react-router-dom";

const appwriteAccount = new AppwriteAccount();

const PrivateRoute = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => appwriteAccount.getUser(),
  });

  if (isLoading) {
    return <Outlet context={{ authLoading: true }} />;
  }

  if (isError || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={{ authLoading: false, user }} />;
};

export default PrivateRoute;
