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
    <div className="min-h-screen bg-gray-50">
      
      {/* ================= Main ================= */}
      <main className="p-8 space-y-8">
       
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Offer Ride - 60% */}
          <div className="lg:col-span-6">
            <OfferRideCard />
          </div>

          {/* Passenger Requests - 40% */}
          <div className="lg:col-span-4">
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
