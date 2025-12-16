import {useQuery} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";

export function useGetTodaysSteps(userId, enabled) {
    const currentDateString = new Date().toISOString().split('T')[0]+'T00:00:00Z';
    const tomorrowDateString = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]+'T00:00:00Z';
    return useQuery({
        enabled: enabled,
        queryKey: ['todaysSteps', userId, currentDateString],
        queryFn: async () => {
            console.log("Fetching today's steps for user:", userId, "on date:", currentDateString);
            const {data, error} = await supabase
                .from('step_windows')
                .select('start_time, end_time, steps')
                .eq('user_id', userId)
                .gte('start_time', currentDateString)
                .lt('end_time', tomorrowDateString);
            console.log(data, error);
            const totalSteps = data.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.steps;
            }, 0);
            return totalSteps;
        },
        placeholderData: 0
    });
}