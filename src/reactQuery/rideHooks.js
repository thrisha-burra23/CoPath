import { useMutation } from "@tanstack/react-query"
import { createRide } from "../appwrite/rideServices"
import { toast } from "react-toastify";

export const useCreateRide = () => {
    return useMutation({
        mutationFn: createRide,
        onSuccess: () => {
            toast.success("Ride Posted successfully!")
        }
    });
}