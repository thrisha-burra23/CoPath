import { useQuery } from "@tanstack/react-query"
import { fetchRoute, fetchSuggestions } from "../api/map"
import { useEffect, useState } from "react"

export const useRoute = (searchData) => {
    return useQuery({
        queryKey: ["route", searchData?.startLocation, searchData?.endLocation],
        queryFn: fetchRoute,
        enabled: ! !searchData
    })
}

export const useLocationSuggestions=(query)=>{
    return useQuery({
        queryKey:["location-suggestions",query],
        queryFn:fetchSuggestions,
        enabled:query.length>=2,
        staleTime:1000*60*5
    })
}

export const useDebounce = (value, delay = 400) => {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceValue(debounceValue);
        }, delay);

        return ()=>clearInterval(timer);
    }, [delay, value]);

    return debounceValue
}