import { Button } from "@/components/ui/button";
import { useApprovedPassengers } from "@/src/reactQuery/passengerRequestHooks";
import { useNavigate } from "react-router-dom";

const DriverRideCard = ({ ride }) => {
  const navigate = useNavigate();
  const { data: passengers = [] } = useApprovedPassengers(ride.$id);

  const rideTime =
    ride.time && !isNaN(new Date(ride.time)) ? new Date(ride.time) : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 space-y-3">
      <div>
        <h4 className="font-semibold">
          {ride.startLabel.split(",")[0]} →{ride.endLabel.split(",")[0]}
        </h4>

        {rideTime && (
          <p className="text-sm text-gray-500">{rideTime.toLocaleString()}</p>
        )}
      </div>

      {/* Approved Passengers */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">
          Approved Passengers:
        </p>

        {passengers.length === 0 && (
          <p className="text-xs text-gray-400">No approved passengers</p>
        )}

        {passengers.map((p) => (
          <div
            key={p.$id}
            className="flex justify-between items-center text-sm"
          >
            <span>{p.passengerName}</span>

            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/chat/${ride.$id}/${p.passengerId}`)}
            >
              Chat
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverRideCard;
