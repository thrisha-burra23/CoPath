import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMessages, sendMessage } from "../appwrite/chatServices";


export const useRideChat = (rideId) => {
    return useQuery({
        queryKey: ["ride-chat", rideId],
        queryFn: () => getMessages(rideId),
        enabled: !!rideId,
        refetchInterval: 2000,
    });
};

export const useSendMessage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendMessage,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(["ride-chat", variables.rideId]);
        },
    });
};