import { useOutletContext } from "react-router-dom";
import UserDashboardSkeleton from "../loadingSkeleton/UserDashboardSkeleton";
import Header from "../components/userDashboard/Header";
import SearchCard from "../components/userDashboard/SearchCard";
import Map from "../components/userDashboard/Map";
import AvailableRides from "../components/userDashboard/RidesList";
import { useState } from "react";

const UserDashboard = () => {
  const { authLoading, user } = useOutletContext();
  const [searchData,setSearchData]=useState(null);

  if (authLoading) {
    return <UserDashboardSkeleton />;
  }
  return (
    <>
      <Header />
      <main className="px-8 py-6 space-y-6">
        {/* Top Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <SearchCard  onSearch={setSearchData}/>
          </div>

          <div className="col-span-2">
            <Map searchData={searchData} />
          </div>
        </div>

        {/* Bottom Section */}
        <AvailableRides />
      </main>
      <footer className="px-8 py-6">@copyrights</footer>
    </>
  );
};

export default UserDashboard;
