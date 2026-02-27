import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../reactQuery/authHooks";
import { useProfile } from "../reactQuery/profileHooks";
import { useMyBookingsWithRideDetails } from "../reactQuery/passengerRequestHooks";
import { useDriverRides } from "../reactQuery/rideHooks";
import { Button } from "@/components/ui/button";
import DriverRideCard from "../components/driver-dashboard/DriverRideCArd";

const MyBookingsPage = () => {
  const { data: user } = useAuthUser();
  const { data: profile } = useProfile(user?.$id);
  const navigate = useNavigate();

  const { data: passengerBookings = [] } = useMyBookingsWithRideDetails(
    user?.$id,
  );

  const { data: driverRides = [] } = useDriverRides(user?.$id);

  console.log("profile", profile);
  console.log("user", user);
  console.log("passengerBookings", passengerBookings);
  console.log("driverRides", driverRides);

  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-semibold">My Bookings</h2>

      {/* Passenger Bookings */}
      <div>
        <h3 className="font-medium mb-4">Rides I Booked</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {passengerBookings.map((booking) => {
            const ride = booking.ride?.ride;
            if (!ride) return null;

            const rideTime =
              ride.time && !isNaN(new Date(ride.time))
                ? new Date(ride.time)
                : null;

            return (
              <div
                key={booking.$id}
                className="bg-white rounded-xl shadow-sm border p-5 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {ride.startLabel?.split(",")[0]} →
                    {ride.endLabel?.split(",")[0]}
                  </h4>

                  {rideTime && (
                    <p className="text-sm text-gray-500 mt-1">
                      {rideTime.toLocaleDateString()} •{" "}
                      {rideTime.toLocaleTimeString()}
                    </p>
                  )}

                  <p className="text-sm mt-2">
                    Status:{" "}
                    <span className="font-medium text-indigo-600">
                      {booking.status}
                    </span>
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() =>
                      navigate(`/user-dashboard/rides/${ride.$id}`)
                    }
                  >
                    View
                  </Button>

                  {booking.status === "APPROVED" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        navigate(`/chat/${ride.$id}/${ride.driverId}`)
                      }
                    >
                      Chat
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {profile?.driverApproved && (
        <div>
          <h3 className="font-medium mb-4">Rides I Posted</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {driverRides.map((ride) => (
              <DriverRideCard key={ride.$id} ride={ride} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
