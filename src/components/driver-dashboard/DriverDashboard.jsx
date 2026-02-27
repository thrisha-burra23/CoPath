import { useOutletContext } from "react-router-dom";
import { usePassengerRequest } from "@/src/reactQuery/passengerRequestHooks";
import { useDriverRides } from "@/src/reactQuery/rideHooks";
import DriverStats from "./DriverStats";
import DriverRides from "./DriverRides";
import PassengerRequests from "./PassengerRequests";
import DriverEarnings from "./DriverEarnings";
import OfferRideCard from "./OfferRideCard";
import DashboardSkeleton from "@/src/loadingSkeleton/DashboardSkeleton";

export default function DriverDashboard() {
   const { user,isLoadding } = useOutletContext();  
  const { data: ridesData } = useDriverRides(user?.$id);
  const { data: requestsData } = usePassengerRequest(user?.$id);

  const rides = ridesData || [];
  const requests = requestsData?.rows || [];

  if(isLoadding) return <DashboardSkeleton/>
  return (
 <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      
      {/* ================= Main ================= */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-10">
       
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-8 items-start">
          {/* Offer Ride - 60% */}
          <div className="xl:col-span-6 space-y-6">
            <OfferRideCard />
          </div>

          {/* Passenger Requests - 40% */}
         <div className="xl:col-span-4">
            <PassengerRequests rides={rides} requests={requests} />
          </div>
        </div>

        <DriverStats rides={rides} requests={requests} />

        <DriverRides rides={rides} />

        <DriverEarnings rides={rides} />
      </main>
    </div>
  );
}
