import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useApprovePassengerRequest,
  useRejectPassengerRequest,
} from "@/src/reactQuery/passengerRequestHooks";
import React from "react";
import PassengerRequestRow from "./PassengerRequestRow";

const PassengerRequests = ({ rides, requests }) => {
  const approveMutation = useApprovePassengerRequest();
  const rejectMutation = useRejectPassengerRequest();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Passenger Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm max-h-50 overflow-y-auto pr-1">
        {requests.length === 0 && (
          <p className="text-gray-500">No requests yet</p>
        )}
        {requests.map((req) => {
          const ride = rides.find((r) => r.$id === req.rideId);
          if (!ride) return null;
          return (
            <PassengerRequestRow
              key={req.$id}
              request={req}
              ride={ride}
              onApprove={() => approveMutation.mutate({ request:req, ride })}
              onReject={() => rejectMutation.mutate({ requestId: req.$id })}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PassengerRequests;
