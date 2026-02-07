import { useMutation, useQuery } from "@tanstack/react-query"
import { getPassengerRequestByDriverId, updatePassengerRequestStatus } from "../appwrite/passengerRequestServices"
import { updateRideSeats } from "../appwrite/rideServices";
import { toast } from "react-toastify";

export const usePassengerRequest = (driverId) => {
    return useQuery({
        queryKey: ["passenger-request", driverId],
        queryFn: () => getPassengerRequestByDriverId(driverId),
        enabled: !!driverId
    });
}

export const useApprovePassengerRequest = () => {
    return useMutation({
        mutationFn: async ({ request, ride }) => {
            if (ride.availableSeats < request.seatsRequested) {
                throw new Error("Not enough seats available")
            }
            await updatePassengerRequestStatus(request.$id, "APPROVED")

            const remainingSeats = ride.availableSeats - request.seatsRequested

            await updateRideSeats(ride.$id, remainingSeats)

        },
        onSuccess: () => {
            queryClient.invalidateQueries(["passenger-requests"]);
            queryClient.invalidateQueries(["driver-rides"]);
        },
        onError: (error) => toast.error(error.message)
    })
}

export const useRejectPassengerRequest = () => {
    return useMutation({
        mutationFn: ({ requestId }) => updatePassengerRequestStatus(requestId, "REJECTED"),
        onSuccess: () => {
            queryClient.invalidateQueries(["passenger-requests"]);
        }
    })
}