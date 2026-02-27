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
    <Card className="h-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl">
      <CardHeader className="pb-2 border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-between">
          Passenger Requests
          <span className="text-sm font-normal text-gray-500">
            {requests.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300">
        {requests.length === 0 && (
          <p className="text-gray-400 text-center py-6">
            No passenger requests yet 🚗
          </p>
        )}
        {requests.map((req) => {
          const ride = rides.find((r) => r.$id === req.rideId);

          if (!ride) return null;
          return (
            <PassengerRequestRow
              key={req.$id}
              request={req}
              ride={ride}
              onApprove={() => approveMutation.mutate({ request: req, ride })}
              onReject={() => rejectMutation.mutate({ requestId: req.$id })}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PassengerRequests;
