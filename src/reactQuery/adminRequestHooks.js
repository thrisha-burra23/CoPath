import { toast } from "react-toastify";
import { createDriverRequest, fetchDriverRequest } from "../appwrite/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useDriverRequest=(userId)=>{
    return useQuery({
        queryKey:["driver-req",userId],
        queryFn:()=>fetchDriverRequest(userId),
        enabled: !!userId
    });
}

export const useCreateDriverRequest=()=>{
    const navigate=useNavigate();
    return useMutation({
        mutationFn:createDriverRequest,
        onSuccess:()=>{
            toast.success("Request Created successfully !!");
            navigate("/driver")
        }
    })
}



