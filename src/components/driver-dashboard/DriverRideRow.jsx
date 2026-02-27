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
    <div className="flex items-center justify-between border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div>
        <p className="font-semibold text-gray-800">
          {shortLocation(ride.startLabel)} → {shortLocation(ride.endLabel)}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          {new Date(ride.time).toLocaleString()} • Seats: {ride.availableSeats}{" "}
          • ₹{ride.price}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            ride.status === "ACTIVE"
              ? "bg-emerald-100 text-emerald-700"
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
            className="rounded-lg border-gray-300 hover:bg-gray-100 transition-all duration-200"
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
