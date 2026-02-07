import React from "react";

const DriverRideRow = ({ride}) => {
  return (
    <div className="flex items-center justify-between border rounded-lg p-3">
      <div>
        <p className="font-medium">
          {ride.startLabel} → {ride.endLabel}
        </p>
        <p className="text-gray-500 text-xs">
            {new Date(ride.date).toLocaleDateString()} .{" "}        
            Seats-{ride.availableSeats}
            Price-{ride.price}
        </p>
      </div>

    </div>
  );
};

export default DriverRideRow;
