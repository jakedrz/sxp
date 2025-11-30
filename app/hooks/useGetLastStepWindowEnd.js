import {useQuery} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";

export function useGetLastStepWindowEnd(userId, enabled) {
    return useQuery({
        enabled: enabled,
        queryKey: ['lastStepWindowEnd', userId],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('step_windows')
                .select('end_time')
                .eq('user_id', userId)
                .order('end_time', {ascending: false})
                .limit(1)
                .maybeSingle();
            if (error) {
                return {data: null, error: error}
            }
            if (data == null) {
                return {data: null, error: null}
            } else {
                return {data, error: null}
            }
        }
    });
}