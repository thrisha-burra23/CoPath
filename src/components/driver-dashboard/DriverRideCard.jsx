import { Button } from "@/components/ui/button";
import { useApprovedPassengers } from "@/src/reactQuery/passengerRequestHooks";
import { useNavigate } from "react-router-dom";

const DriverRideCard = ({ ride }) => {
  const navigate = useNavigate();
  const { data: passengers = [] } = useApprovedPassengers(ride.$id);

  const rideTime =
    ride.time && !isNaN(new Date(ride.time)) ? new Date(ride.time) : null;

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-800">
          {ride.startLabel.split(",")[0]} →{ride.endLabel.split(",")[0]}
        </h4>

        {rideTime && (
          <p className="text-sm text-gray-500 mt-1">
            {rideTime.toLocaleString()}
          </p>
        )}
      </div>

      {/* Approved Passengers */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wide font-medium text-gray-500">
          Approved Passengers:
        </p>

        {passengers.length === 0 && (
          <p className="text-xs text-gray-400 italic">No approved passengers</p>
        )}

        {passengers.map((p) => (
          <div
            key={p.$id}
            className="flex justify-between items-center text-sm bg-gray-50 rounded-lg px-3 py-2"
          >
            <span>{p.passengerName}</span>

            <Button
              size="sm"
              variant="outline"
              className="rounded-lg border-gray-300 hover:bg-gray-100 transition"
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
