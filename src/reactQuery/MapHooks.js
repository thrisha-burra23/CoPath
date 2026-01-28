import { useQuery } from "@tanstack/react-query"
import { fetchRoute } from "../api/map"

export const useRoute = (searchData) => {
    return useQuery({
        queryKey: ["route", searchData?.startLocation, searchData?.endLocation],
        queryFn: fetchRoute,
        enabled: ! !searchData
    })
}