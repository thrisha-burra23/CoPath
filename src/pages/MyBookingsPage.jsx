import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../reactQuery/authHooks";
import { useProfile } from "../reactQuery/profileHooks";
import { useMyBookingsWithRideDetails } from "../reactQuery/passengerRequestHooks";
import { useDriverRides } from "../reactQuery/rideHooks";
import { Button } from "@/components/ui/button";
import DriverRideCard from "../components/driver-dashboard/DriverRideCArd";
import MyBookingsPageSkeleton from "../loadingSkeleton/MyBookingsSkeleton";

const MyBookingsPage = () => {
  const { data: user } = useAuthUser();
  const { data: profile } = useProfile(user?.$id);
  const navigate = useNavigate();

  const { data: passengerBookings = [], isLoading } =
    useMyBookingsWithRideDetails(user?.$id);

  const { data: driverRides = [] } = useDriverRides(user?.$id);

  if (isLoading) {
    return <MyBookingsPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 space-y-10">
        <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>

        {/* Passenger Bookings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-6">
            Rides I Booked
          </h3>

          {passengerBookings.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center col-span-full">
              <p className="text-gray-600 mb-4">
                You haven’t booked any rides yet.
              </p>
              <Button
                className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white"
                onClick={() => navigate("/user-dashboard")}
              >
                Search Rides
              </Button>
            </div>
          ) : (
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
                    className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {ride.startLabel?.split(",")[0]} →
                        {ride.endLabel?.split(",")[0]}
                      </h4>

                      {rideTime && (
                        <p className="text-sm text-gray-500 mt-2">
                          {rideTime.toLocaleDateString()} •{" "}
                          {rideTime.toLocaleTimeString()}
                        </p>
                      )}

                      <p className="text-sm mt-2">
                        Status:{" "}
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                          {booking.status}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="rounded-lg bg-gradient-to-r from-cyan-400 to-indigo-500 text-white shadow hover:opacity-90 transition"
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
                          className="rounded-lg border-gray-300 hover:bg-gray-100 transition"
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
          )}
        </div>

        {profile?.driverApproved && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-6">
              Rides I Posted
            </h3>

            {driverRides.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center">
                <p className="text-gray-600 mb-4">
                  You haven’t posted any rides yet.
                </p>
                <Button
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 text-white"
                  onClick={() => navigate("/offer-ride")}
                >
                  Post a Ride
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {driverRides.map((ride) => (
                  <DriverRideCard key={ride.$id} ride={ride} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
