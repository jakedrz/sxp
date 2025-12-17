import {useQuery} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";

export function useGetTodaysSteps(userId, enabled) {

    // Replace UTC ISO strings with local-midnight date strings
    function toLocalDateStringMidnight(date) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}T00:00:00`;
    }
    const today = new Date();
    const currentDateString = toLocalDateStringMidnight(today);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDateString = toLocalDateStringMidnight(tomorrow);

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