import React from "react";

const DriverRideRow = ({ ride }) => {
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
    </div>
  );
};

export default DriverRideRow;
