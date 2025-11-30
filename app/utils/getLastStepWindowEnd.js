import {supabase} from "./supabase";

export const getLastStepWindowEnd = async (userId) => {
    const {data, error} = await supabase
        .from('step_windows')
        .select('end_time')
        .eq('user_id', userId)
        .order('end_time', {ascending: false})
        .limit(1)
        .maybeSingle();
    return {end_time: data?.end_time, error};
}