import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useApprovePassengerRequest,
  useRejectPassengerRequest,
} from "@/src/reactQuery/passengerRequestHooks";
import React from "react";

const PassengerRequests = ({ rides, requests }) => {
  const approveMutation = useApprovePassengerRequest();
  const rejectMutation = useRejectPassengerRequest();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Requests</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
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
              onApprove={() => approveMutation.mutate({ req, ride })}
              onReject={() => rejectMutation.mutate({ requestId:req.$id })}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PassengerRequests;
