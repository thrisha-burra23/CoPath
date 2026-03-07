import { toast } from "react-toastify";
import { cancelDriverRequest, createDriverRequest, fetchDriverRequest } from "../appwrite/adminServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "./queryClient";

// export const useDriverRequest=(userId)=>{
//     return useQuery({
//         queryKey:["driver-req",userId],
//         queryFn:()=>fetchDriverRequest(userId),
//         enabled: !!userId,
//         refetchOnWindowFocus: true
//     });
// }.

export const useDriverRequest=(userId)=>{
    return useQuery({
        queryKey:["driver-req",userId],
        queryFn:()=>fetchDriverRequest(userId),
        enabled: !!userId,
        refetchOnWindowFocus: true,
        refetchInterval:5000
    });
}



export const useCreateDriverRequest = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createDriverRequest,
    onSuccess: () => {
      toast.success("Request Created successfully !!");
      queryClient.invalidateQueries({
        queryKey: ["driver-req"],
        exact: false
      });
        navigate("/offer-ride");
    },
    onError: (err) => {
      console.error("Create error:", err);
      toast.error("Failed to create request");
    }
  });
};


export const useCancelDriverRequest = () => {
  return useMutation({
    mutationFn: cancelDriverRequest, 
    onSuccess: () => {
      queryClient.invalidateQueries(["driver-req"]);
    }
  });
};


