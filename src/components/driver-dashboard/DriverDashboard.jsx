import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useOutletContext } from "react-router-dom";
import { usePassengerRequest } from "@/src/reactQuery/passengerRequestHooks";
import { useDriverRides } from "@/src/reactQuery/rideHooks";
import DriverHeader from "./DriverHeader";
import DriverStats from "./DriverStats";
import DriverRides from "./DriverRides";
import PassengerRequests from "./PassengerRequests";
import DriverEarnings from "./DriverEarnings";
import OfferRideCard from "./OfferRideCard";

export default function DriverDashboard() {
  const { user } = useOutletContext();
  const { data: ridesData } = useDriverRides(user?.$id);
  const { data: requestsData } = usePassengerRequest(user?.$id);

  const rides = ridesData?.rows || [];
  const requests = requestsData?.rows || [];
  return (
    <div className="min-h-screen bg-gray-50">
      <DriverHeader user={user} />

      {/* ================= Main ================= */}
      <main className="p-8 space-y-8">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome {user.name || "Driver"} 👋
          </h2>
          <p className="text-gray-500">
            Manage your rides, passengers, and earnings.
          </p>
        </div>

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

/* ================= Helper Components ================= */

function RideRow({ route, date, seats, price, status }) {
  const statusColor =
    status === "Active"
      ? "bg-green-100 text-green-700"
      : status === "Upcoming"
        ? "bg-blue-100 text-blue-700"
        : "bg-gray-100 text-gray-600";

  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <p className="font-medium">{route}</p>
        <p className="text-gray-500 text-xs">
          {date} • {seats} seats • {price}
        </p>
      </div>
      <Badge className={statusColor}>{status}</Badge>
    </div>
  );
}

function PassengerRow({ name, rating, seats }) {
  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">
          ⭐ {rating} • {seats} seat(s)
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="sm">Approve</Button>
        <Button size="sm" variant="outline">
          Reject
        </Button>
      </div>
    </div>
  );
}
