import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/src/reactQuery/authHooks";
import { useProfile } from "@/src/reactQuery/profileHooks";
import { useCompleteRide } from "@/src/reactQuery/rideHooks";
import React from "react";

const DriverRideRow = ({ ride }) => {
  const { data: user } = useAuthUser();
  const { data: profile } = useProfile(user.$id);
  const completeRideMutation = useCompleteRide();

  const shortLocation = (label) => {
    if (!label) return "";
    return label.split(",")[0];
  };
  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <p className="font-medium">
          {shortLocation(ride.startLabel)} → {shortLocation(ride.endLabel)}
        </p>
        <p className="text-gray-500 text-xs">
          {new Date(ride.time).toLocaleString()} • Seats: {ride.availableSeats}{" "}
          • ₹{ride.price}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            ride.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : ride.status === "COMPLETED"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {ride.status}
        </span>
        {ride.status === "ACTIVE" && (
          <Button
            size="sm"
            disabled={!profile || completeRideMutation.isLoading}
            variant="outline"
            onClick={() => {
              completeRideMutation.mutate({
                ride,
                driverProfile: profile,
              });
            }}
          >
            Mark Completed
          </Button>
        )}
      </div>
    </div>
  );
};

export default DriverRideRow;
