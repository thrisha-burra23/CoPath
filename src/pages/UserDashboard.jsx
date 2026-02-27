import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import SearchCard from "../components/userDashboard/SearchCard";
import Map from "../components/userDashboard/Map";
import { useState } from "react";
import RideDetails from "../components/userDashboard/RideDetails";
import DashboardSkeleton from "../loadingSkeleton/DashboardSkeleton";

const UserDashboard = () => {
  const { authLoading, user } = useOutletContext();
  const [searchData, setSearchData] = useState(null);
  const [isProfileOPen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { rideId } = useParams();

  const isRideModelOpen = !!rideId;

  if (authLoading) {
    return <DashboardSkeleton />;
  }
  return (
    <>
      <main className="relative px-8 py-6 space-y-6">
        <div
          className={`space-y-6 transition-all duration-200 ${
            isRideModelOpen || isProfileOPen
              ? "blur-sm pointer-events-none"
              : ""
          }`}
        >
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <div className="sticky top-24">
                <SearchCard onSearch={setSearchData} />
              </div>
            </div>

            <div className="col-span-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                <Map searchData={searchData} />
              </div>
            </div>
          </div>

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
    </>
  );
};

export default UserDashboard;
