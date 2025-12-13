import {useQuery} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";

export function useGetUserGameStandingQuery(userGameId, enabled) {
    return useQuery({
        enabled: enabled,
        queryKey: ['userGameStanding'],
        queryFn: async () => {
            const {data, error} = await supabase
                .functions
                .invoke('get-user-game-standing', {
                    body: {
                        userGameId: userGameId,
                    }
                });
            console.log(userGameId, data, error);
            return data;
        },
        placeholderData: []
    });
}