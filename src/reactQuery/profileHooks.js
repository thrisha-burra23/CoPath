import { useQuery } from "@tanstack/react-query"
import { fetchProfileByUserId } from "../appwrite/ProfileServices"

export const useProfile=(userId)=>{
    return useQuery({
        queryKey:["profile"],
        queryFn:()=>fetchProfileByUserId(userId),
        enabled:! !userId
    })
}