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
import OfferRide from "@/src/pages/OfferRidePage";
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
            Welcome {user.$Name || "Driver"} 👋
          </h2>
          <p className="text-gray-500">
            Manage your rides, passengers, and earnings.
          </p>
        </div>

        <DriverStats rides={rides} requests={requests} />
        <DriverRides rides={rides} />
        <PassengerRequests rides={rides} requests={requests} />
        <DriverEarnings rides={rides} />

        {/* <OfferRideCard/> */}
        {/* ================= Offer Ride ================= */}
        <Card>
          <CardHeader>
            <CardTitle>➕ Offer a New Ride</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="From (e.g. Bangalore)" />
            <Input placeholder="To (e.g. Chennai)" />
            <Input type="date" />
            <Input type="time" />
            <Input placeholder="Seats Available" />
            <Input placeholder="Price per Seat (₹)" />

            <div className="md:col-span-2">
              <Button className="w-full">Publish Ride</Button>
            </div>
          </CardContent>
        </Card>

        {/* ================= My Rides ================= */}
        <Card>
          <CardHeader>
            <CardTitle>📋 My Rides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <RideRow
              route="Bangalore → Chennai"
              date="20 Feb"
              seats="3"
              price="₹450"
              status="Active"
            />
            <RideRow
              route="Bangalore → Mysore"
              date="22 Feb"
              seats="2"
              price="₹300"
              status="Upcoming"
            />
            <RideRow
              route="Chennai → Bangalore"
              date="10 Feb"
              seats="4"
              price="₹500"
              status="Completed"
            />
          </CardContent>
        </Card>

        {/* ================= Passenger Requests ================= */}
        <Card>
          <CardHeader>
            <CardTitle>👥 Passenger Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <PassengerRow name="Ankit Sharma" rating="4.5" seats="1" />
            <PassengerRow name="Priya Verma" rating="4.8" seats="2" />
          </CardContent>
        </Card>

        {/* ================= Earnings ================= */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Earnings</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p>
              This Week: <strong>₹3,450</strong>
            </p>
            <p>
              This Month: <strong>₹12,200</strong>
            </p>
            <p className="text-gray-500">Last payout: ₹2,000 (12 Feb 2026)</p>
          </CardContent>
        </Card>

        {/* ================= Footer Actions ================= */}
        <div className="flex justify-between">
          <Button variant="outline">Switch to User Mode</Button>
          <Button variant="destructive">Logout</Button>
        </div>
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
