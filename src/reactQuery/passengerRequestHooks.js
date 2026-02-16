import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    cancelPassengerRequest,
    createPassengerRequest,
    getApprovedPassengersByRide,
    getMyBookings,
    getPassengerRequestByDriverId,
    updatePassengerRequestStatus,
} from "../appwrite/passengerRequestServices";
import { fetchRideDetails, updateRideSeats } from "../appwrite/rideServices";
import { toast } from "react-toastify";
import { fetchProfileByUserId, updateWalletBalance } from "../appwrite/ProfileServices";

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

            const passengerProfile = await fetchProfileByUserId(request.passengerId);
            const fare = ride.price * request.seats_requested;

            if ((passengerProfile.walletBalance ?? 0) < fare) {
                throw new Error("Passenger has insufficient wallet balance");
            }

            await updateWalletBalance(passengerProfile.$id, passengerProfile.walletBalance - fare);

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

export const usePassengerBookingStatus = (rideId, passengerId) => {
    return useQuery({
        queryKey: ["booking-status", rideId, passengerId],
        queryFn: () => getPassergerRequestByRideAndUser({ rideId, passengerId }),
        enabled: !!passengerId && !!rideId
    })
}

export const useMyBookingsWithRideDetails = (passengerId) => {
    return useQuery({
        queryKey: ["my-bookings-with-rides",passengerId],
        enabled: !!passengerId,
        queryFn: async () => {
            const bookings = await getMyBookings(passengerId);
            const all = Promise.all(
                bookings.map(async (booking) => {
                    const ride = await fetchRideDetails(booking.rideId)
                    return {
                        ...booking,
                        ride
                    }
                })
            )
            return all;
        }
    })
}

export const useCancelBooking = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelPassengerRequest,
        onSuccess: () => {
            toast.info("Booking cancelled");
            queryClient.invalidateQueries(["my-bookings"]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to cancel booking");
        },
    });
};

export const useApprovedPassengers = (rideId) => {
  return useQuery({
    queryKey: ["approved-passengers", rideId],
    queryFn: () => getApprovedPassengersByRide(rideId),
    enabled: !!rideId,
  });
};