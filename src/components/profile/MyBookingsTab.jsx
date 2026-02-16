import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import {
  useCancelBooking,
  useMyBookingsWithRideDetails,
} from "@/src/reactQuery/passengerRequestHooks";

const statusStyle = {
  PENDING: "text-yellow-600",
  APPROVED: "text-green-600",
  REJECTED: "text-red-600",
};
const MyBookingsTab = () => {
  const { data: user } = useAuthUser();
  const { data = [], isLoading } = useMyBookingsWithRideDetails(user.$id);
  const cancelMutation = useCancelBooking();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading bookings...</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">📘 My Bookings</h3>

      {data.length === 0 && (
        <p className="text-sm text-gray-500">
          you haven't booked any rides yet
        </p>
      )}

      {data.map((booking) => {
        const ride = booking.ride?.ride;
        const driver = booking.ride?.driver;

        if (!ride) return null;

        const rideTime = new Date(ride.time);
        return (
          <div
            className="border rounded-md p-3 text-sm space-y-1"
            key={booking.$id}
          >
            <p className="font-medium">
              {ride.startLabel?.split(",")[0]} → {ride.endLabel?.split(",")[0]}
            </p>
            {rideTime && (
              <p className="text-gray-500 text-xs">
                {rideTime.toLocaleDateString()} •{" "}
                {rideTime.toLocaleTimeString()}
              </p>
            )}
            <p>Seats:{booking.seats_requested}</p>
            <p>
              Status:{" "}
              <span className={statusStyle[booking.status]}>
                {booking.status}
              </span>
            </p>
            {driver && (
              <div className="mt-2 text-xs text-gray-600 border-t pt-2">
                <p className="font-medium text-gray-800">🚗 Driver</p>
                <p>Name: {driver.name}</p>
                {driver.phone && <p>Phone: {driver.phone}</p>}
              </div>
            )}
            {booking.status === "PENDING" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => cancelMutation.mutate(booking.$id)}
              >
                Cancel Booking
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyBookingsTab;
