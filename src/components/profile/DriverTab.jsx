import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useProfile } from "@/src/reactQuery/profileHooks";
import { useDriverRides } from "@/src/reactQuery/rideHooks";
import { useVehicleApproved } from "@/src/reactQuery/vehicleHooks";
import { useNavigate } from "react-router-dom";

const DriverTab = () => {
  const { data: user } = useAuthUser();
  const { data: profile, isLoading: profileLoading } = useProfile(user?.$id);
  const { data: rides } = useDriverRides(user?.$id);
  const { data: vehicle } = useVehicleApproved(user?.$id);
  const navigate = useNavigate();

  const safeRides = Array.isArray(rides) ? rides : [];

  console.log("User object:", user);
  console.log("User ID:", user?.$id);

  if (profileLoading) {
    return <p className="text-sm text-gray-500">Loading driver status...</p>;
  }

  if (!profile?.driverApproved) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          You are not an approved driver yet.
        </p>
        <Button onClick={() => navigate("/request-to-offer-ride")}>
          Become a Driver
        </Button>
      </div>
    );
  }

  const upcomingRides = safeRides.filter(
    (ride) => new Date(ride.time) > new Date(),
  );

  return (
    <div className="space-y-6">
      <h3 className="font-semibold text-lg">🚗 Driver Profile</h3>

      <div className="border rounded-md p-3 text-sm space-y-1">
        <p className="font-medium">Vehicle Details</p>
        {vehicle ? (
          <>
            <p>Model: {vehicle.model}</p>
            <p>Number Plate: {vehicle.numberPlate}</p>
            <p>Total Seats: {vehicle.seats}</p>
          </>
        ) : (
          <p className="text-gray-500">No approved vehicle found.</p>
        )}
      </div>

      <div className="border rounded-md p-3 text-sm space-y-1">
        <p className="font-medium">Ride Overview</p>
        <p>Total Rides: {safeRides.length}</p>
        <p>Upcoming Rides: {upcomingRides.length}</p>
      </div>

      <Button onClick={() => navigate("/offer-ride")}>
        Go to Driver Dashboard
      </Button>
    </div>
  );
};

export default DriverTab;
