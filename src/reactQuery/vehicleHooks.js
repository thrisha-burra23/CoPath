import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify";
import { createVehicleRequest, fetchApprovedVehicleByUser } from "../appwrite/vehicleServices";

export const useCreateVehicle = () => {
    return useMutation({
        mutationFn: createVehicleRequest,
        onSuccess: () => {
            toast.success("Ride Posted successfully!")
        }
    });
}

export const useVehicleApproved=(id)=>{
    return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchApprovedVehicleByUser(id),
    enabled:!!id
  });
}