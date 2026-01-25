import { useOutletContext } from "react-router-dom";
import UserDashboardSkeleton from "../loadingSkeleton/UserDashboardSkeleton";
import Header from "../components/userDashboard/Header";
import SearchCard from "../components/userDashboard/SearchCard";
import Map from "../components/userDashboard/Map";
import AvailableRides from "../components/userDashboard/RidesList";

const UserDashboard = () => {
  const { authLoading, user } = useOutletContext();

  if (authLoading) {
    return <UserDashboardSkeleton />;
  }
  return (
    <>
      <Header />
      <main className="px-8 py-6">
       <div className="flex flex-row ">
          <SearchCard />
          <Map />
        </div>
        <AvailableRides/>
      </main>
      <footer className="px-8 py-6">@copyrights</footer>
    </>
  );
};

export default UserDashboard;
