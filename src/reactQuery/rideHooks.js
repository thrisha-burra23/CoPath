import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { completeRidesAndRelease, createRide, fetchAllAvailableRides, fetchRideDetails, fetchRidesByDriver, searchRides } from "../appwrite/rideServices"
import { toast } from "react-toastify";

export const useCreateRide = () => {
    return useMutation({
        mutationFn: async (data) => {
            if (!data?.driverId) {
                throw new Error("Unauthorized: Driver not found")
            }
            if (!data?.status || data.status !== "ACTIVE") {
                throw new Error("Invalid ride status")
            }

            return createRide(data);
        },
        onSuccess: () => {
            toast.success("Ride Posted successfully!")
        },
        onError: (err) => {
            toast.error(err.message || "Failed to post ride");
        }
    });
}

export const useDriverRides = (driverId) => {
    return useQuery({
        queryKey: ["driver-rides", driverId],
        queryFn: () => fetchRidesByDriver(driverId),
        enabled: !!driverId
    })
}

export const useAvailableRides = () => {
    return useQuery({
        queryKey: ["available-rides"],
        queryFn: fetchAllAvailableRides,
        staleTime: 1000 * 60 * 2
    })
}

export const useRideDetils = (rideId) => {
    return useQuery({
        queryKey: ["ride-details", rideId],
        queryFn: () => fetchRideDetails(rideId),
        enabled: !!rideId
    })
}

export const useSearchRides = ({ start, end, date }) => {
    return useQuery({
        queryKey: ["search-rides", start, end, date],
        queryFn: () => searchRides({ start, end, date }),
        enabled: !!start && !!end
    })
}

export const useCompleteRide = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: completeRidesAndRelease,
        onSuccess: () => {
            toast.success("Ride completed. Earnings released!");
            queryClient.invalidateQueries(["driver-rides"]);
            queryClient.invalidateQueries(["profile"]);
        },
        onError: (err) => {
            toast.error(err.message || "Failed to complete ride");
        }
    })
}