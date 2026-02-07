import { Button } from "@/components/ui/button";

const PassengerRequestRow = ({ request, ride, onApprove, onReject }) => {
  return (
    <div className="flex justify-between items-center border rounded-lg p-3">
      <div>
        <p className="font-medium">{request.passengerId}</p>
        <p className="text-xs text-gray-500">
          {request.seatsRequested} seat(s) • {ride.startLabel} → {ride.endLabel}
        </p>
      </div>
      <div className="flex ">
        <Button size="sm" onClick={onApprove}>
          Approve
        </Button>
        <Button size="sm" onClick={onReject}>
          Reject
        </Button>
      </div>
    </div>
  );
};

export default PassengerRequestRow;
