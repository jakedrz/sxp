import {useQuery} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";

export function useGetIsUserPlayingGame(userId, enabled) {
    return useQuery({
        enabled: enabled,
        queryKey: ['isUserPlayingGame', userId],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('user_games')
                .select('id, user_id, games (id, title, entry_cost, start_date, end_date), status, joined_at, forfeited_at, won_at, lost_at')
                .eq('user_id', userId)
                .order('joined_at', {ascending: false})
                .limit(1)
                .maybeSingle();
            console.log(data);
            if (error) {
                return {data: null, error: error}
            }
            if (data == null) {
                return {data: false, error: null}
            } else {
                return {data: data.status === 'joined', error: null}
            }
        }
    });
}