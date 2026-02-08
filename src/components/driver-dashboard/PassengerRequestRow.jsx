import { Button } from "@/components/ui/button";

const PassengerRequestRow = ({ request, ride, onApprove, onReject }) => {
  const shortLocation = (label) => {
    if (!label) return "";
    return label.split(",")[0];
  };

  return (
    <div className="flex justify-between items-center border rounded-lg p-3">
      <div>
        <p className="font-medium">{request.passengerName}</p>
        <p className="text-xs text-gray-500">
          {request.seats_requested} seat(s) • {shortLocation(ride.startLabel)} →{" "}
          {shortLocation(ride.endLabel)}
        </p>
      </div>
      <div className="flex  gap-2">
        <Button
          size="sm"
          onClick={onApprove}
          className="text-black bg-green-500"
        >
          Approve
        </Button>
        <Button size="sm" onClick={onReject} className="text-black bg-red-500">
          Reject
        </Button>
      </div>
    </div>
  );
};

export default PassengerRequestRow;
