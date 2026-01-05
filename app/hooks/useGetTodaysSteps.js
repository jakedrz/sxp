import {useQuery} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";

export function useGetTodaysSteps(userId, enabled) {

    // Replace UTC ISO strings with local-midnight date strings (adjusted to UTC)
    function toLocalDateStringMidnight(date) {
        // create a Date at local midnight (this captures the local timezone)
        const localMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        // convert that instant to a UTC ISO string so DB comparisons (stored in UTC) are correct
        // remove milliseconds for consistency (e.g. "2026-01-03T05:00:00Z")
        return localMidnight.toISOString().replace(/\.\d{3}Z$/, 'Z');
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
        placeholderData: 0,
        refetchInterval: 2000,
    });
}