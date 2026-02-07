import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import UserDashboardSkeleton from "../loadingSkeleton/UserDashboardSkeleton";
import Header from "../components/userDashboard/Header";
import SearchCard from "../components/userDashboard/SearchCard";
// import Map from "../components/userDashboard/Map";
import { useState } from "react";
import RideDetails from "../components/userDashboard/RideDetails";

const UserDashboard = () => {
  const { authLoading, user } = useOutletContext();
  const [searchData, setSearchData] = useState(null);
  const navigate = useNavigate();
  const { rideId } = useParams();

  const isRideModelOpen = !!rideId;

  if (authLoading) {
    return <UserDashboardSkeleton />;
  }
  return (
    <>
      <Header />
      <main className="relative px-8 py-6 space-y-6">
        <div
          className={`space-y-6 transition-all duration-200 ${
            isRideModelOpen ? "blur-sm pointer-events-none" : ""
          }`}
        >
          {/* Top Section */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <SearchCard onSearch={setSearchData} />
            </div>

            <div className="col-span-2 border">
              map will render
              {/* <Map searchData={searchData} /> */}
            </div>
          </div>

          {/* Bottom Section */}
          <Outlet />
        </div>

        {isRideModelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => navigate(-1)}
            />

            <div className="relative z-50 w-full max-w-3xl">
              <RideDetails />
            </div>
          </div>
        )}
      </main>
      <footer className="px-8 py-6">@copyrights</footer>
    </>
  );
};

export default UserDashboard;
