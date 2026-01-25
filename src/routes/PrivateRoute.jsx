import AppwriteAccount from "../appwrite/AuthServices";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../reactQuery/authHooks";

const appwriteAccount = new AppwriteAccount();

const PrivateRoute = () => {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return <Outlet context={{ authLoading: true }} />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerification) {
    return <Navigate to="/verify-info" replace />;
  }

  return <Outlet context={{ authLoading: false, user }} />;
};

export default PrivateRoute;
