import { Button } from "@/components/ui/button";

const PassengerRequestRow = ({ request, ride, onApprove, onReject }) => {
  const shortLocation = (label) => {
    if (!label) return "";
    return label.split(",")[0];
  };

  return (
    <div className="flex justify-between items-center border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div>
        <p className="font-semibold text-gray-800">{request.passengerName}</p>
        <p className="text-xs text-gray-500 mt-1">
          {request.seats_requested} seat(s) • {shortLocation(ride.startLabel)} →{" "}
          {shortLocation(ride.endLabel)}
        </p>
      </div>
      <div className="flex  gap-2">
        <Button
          size="sm"
          onClick={onApprove}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm transition-all duration-200"
        >
          Approve
        </Button>
        <Button
          size="sm"
          onClick={onReject}
          className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-sm transition-all duration-200"
        >
          Reject
        </Button>
      </div>
    </div>
  );
};

export default PassengerRequestRow;
