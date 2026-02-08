import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import {
  useCreatePassengerRequest,
  usePassengerBookingStatus,
} from "@/src/reactQuery/passengerRequestHooks";
import { useRideDetils } from "@/src/reactQuery/rideHooks";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const RideDetails = () => {
  const { rideId } = useParams();
  const ridequery = useRideDetils(rideId);
  const navigate = useNavigate();
  const { data: user } = useAuthUser();

  const { data: booking } = usePassengerBookingStatus(rideId, user?.$id);
  const bookMutation = useCreatePassengerRequest();

  if (ridequery.isLoading) return <p>Loading........</p>;

  if (ridequery.error || !ridequery.data)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load ride details
      </p>
    );

  const { ride, driver, vehicle } = ridequery.data;

  const rideDate = new Date(ride.time);

  const handleBooking = () => {
    bookMutation.mutate({
      rideId: ride.$id,
      driverId: ride.driverId,
      passengerId: user.$id,
      passengerName: user.name,
      seats_requested: 1,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-md bg-white">
        <CardContent className="p-6 space-y-6">
          {/* ================= Header ================= */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {ride.startLabel.split(",")[0]}{" "}
                <span className="text-gray-400 mx-1">→</span>{" "}
                {ride.endLabel.split(",")[0]}
              </h2>

              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                  {ride.status}
                </span>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-600">
                  ₹{ride.price}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-900"
            >
              <X size={18} color="red" />
            </Button>
          </div>

          {/* ================= Ride Summary ================= */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Date</p>
              <p className="font-medium">{rideDate.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Time</p>
              <p className="font-medium">{rideDate.toLocaleTimeString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Seats Available</p>
              <p className="font-medium">{ride.availableSeats}</p>
            </div>
          </div>

          {/* ================= Divider ================= */}
          <div className="h-px bg-gray-200" />

          {/* ================= Driver & Vehicle ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            {driver && (
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Driver</p>
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium">{driver.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{driver.phone}</span>
                </div>
              </div>
            )}

            {vehicle && (
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">Vehicle</p>
                <div className="flex justify-between">
                  <span className="text-gray-500">Model</span>
                  <span className="font-medium">{vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Plate</span>
                  <span className="font-medium">{vehicle.numberPlate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seats</span>
                  <span className="font-medium">{vehicle.seats}</span>
                </div>
              </div>
            )}
          </div>

          {/* ================= CTA ================= */}
          <div className="pt-4">
            {!booking && (
              <Button
                className="w-full h-11 text-base font-semibold"
                onClick={handleBooking}
                disabled={ride.availableSeats === 0}
              >
                Book This Ride
              </Button>
            )}

            {booking?.status === "PENDING" && (
              <p className="text-yellow-600 font-medium">
                ⏳ Request sent. Waiting for driver approval.
              </p>
            )}

            {booking?.status === "APPROVED" && (
              <p className="text-green-600 font-medium">
                ✅ Booking confirmed! Enjoy your ride.
              </p>
            )}

            {booking?.status === "REJECTED" && (
              <p className="text-red-600 font-medium">
                ❌ Driver rejected your request.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideDetails;
