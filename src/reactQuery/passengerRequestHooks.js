import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    createPassengerRequest,
    getPassengerRequestByDriverId,
    updatePassengerRequestStatus,
} from "../appwrite/passengerRequestServices";
import { updateRideSeats } from "../appwrite/rideServices";
import { toast } from "react-toastify";

export const usePassengerRequest = (driverId) => {
    return useQuery({
        queryKey: ["passenger-requests", driverId],
        queryFn: () => getPassengerRequestByDriverId(driverId),
        enabled: !!driverId,
    });
};

export const useApprovePassengerRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ request, ride }) => {
            if (ride.availableSeats < request.seats_requested) {
                throw new Error("Not enough seats available");
            }

            await updatePassengerRequestStatus(request.$id, "APPROVED");

            const remainingSeats =
                ride.availableSeats - request.seats_requested;

            await updateRideSeats(ride.$id, remainingSeats);
        },
        onSuccess: () => {
            toast.success("Passenger approved");
            queryClient.invalidateQueries(["passenger-requests"]);
            queryClient.invalidateQueries(["driver-rides"]);
        },
        onError: (error) => toast.error(error.message),
    });
};

export const useRejectPassengerRequest = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ requestId }) =>
            updatePassengerRequestStatus(requestId, "REJECTED"),
        onSuccess: () => {
            toast.info("Request rejected");
            queryClient.invalidateQueries(["passenger-requests"]);
        },
    });
};

export const useCreatePassengerRequest = () => {
    return useMutation({
        mutationFn: createPassengerRequest,
        onSuccess: () => {
            toast.success("Ride request sent. Waiting for driver approval.");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to request ride");
        }
    })
}

export const usePassengerBookingStatus = (rideId,passengerId) => {
    return useQuery({
        queryKey: ["booking-status", rideId, passengerId],
        queryFn: () => getPassergerRequestByRideAndUser(rideId, passengerId),
        enabled: !!passengerId && !!rideId
    })
}