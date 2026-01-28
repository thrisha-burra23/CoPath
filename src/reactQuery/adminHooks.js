import { useMutation, useQuery } from "@tanstack/react-query"
import { approveDriverRequest, fetchDriverRequestsWithDetails, rejectDriverRequest } from "../appwrite/adminServices"
import { toast } from "react-toastify"
import { queryClient } from "./queryClient"

export const useAdminDriverRequests = () => {
    return useQuery({
        queryKey: ["admin-driver-requests"],
        queryFn: fetchDriverRequestsWithDetails
    })
}

export const useApproveDriver = () => {
    return useMutation({
        mutationFn: approveDriverRequest,
        onSuccess: () => {
            toast("Driver Approved");
            queryClient.invalidateQueries(["admin-driver-requests"]);
        }
    })
}

export const useRejectDriver = () => {
    return useMutation({
        mutationFn: rejectDriverRequest,
        onSuccess: () => {
            toast.info("Driver request Rejected");
            queryClient.invalidateQueries(["admin-driver-requests"]);
        }
    })
}