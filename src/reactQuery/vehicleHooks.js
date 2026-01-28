import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { createVehicleRequest } from "../appwrite/vehicleServices";

export const useCreateVehicle = () => {
    return useMutation({
        mutationFn: createVehicleRequest,
        onSuccess: () => {
            toast.success("Ride Posted successfully!")
        }
    });
}