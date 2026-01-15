import { useOutletContext } from "react-router-dom";
import UserDashboardSkeleton from "../loadingSkeleton/UserDashboardSkeleton";

const UserDashboard = () => {
  const { authLoading, user } = useOutletContext();

  if (authLoading) {
    return <UserDashboardSkeleton />;
  }
  return <div>UserDashboard</div>;
};

export default UserDashboard;
