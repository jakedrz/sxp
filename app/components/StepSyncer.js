import {useGetLastStepWindowEnd} from "../hooks/useGetLastStepWindowEnd";
import {Pedometer} from "expo-sensors";
import {getLastStepWindowEnd} from "../utils/getLastStepWindowEnd";
import {useEffect, useState} from "react";
import {useGetUsersMostRecentGame} from "../hooks/useGetUsersMostRecentGame";
import {supabase} from "../utils/supabase";

function StepSyncer({userId}) {

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    useEffect(() => {
        setInterval(async () => {
            await updateSteps(userId);
        }, 10000);
    }, []);

    const updateSteps = async (userId) => {
        const rows = (await getStepsSince(await getStepStartWindow(userId))).map(
            row => ({
                user_id: userId,
                start_time: row.start_time,
                end_time: row.end_time,
                steps: row.steps
            })
        );

        if(rows.length > 0)
        {
            await supabase
                .from('step_windows')
                .insert(rows);

        }
        const {data} = await supabase
            .from('step_windows')
            .select('start_time,end_time,steps')
            .eq('user_id', userId)
            .gte('start_time', new Date(new Date().setHours(0,0,0,0)).toISOString());
    }

    const getStepStartWindow = async (userId) => {
        const dateNow = new Date();
        const dateYesterday = new Date();
        dateYesterday.setDate(dateNow.getDate() - 1);
        const {end_time, error} = await getLastStepWindowEnd(userId);
        if (error) {
            console.error(`Error fetching last step window end: ${error.message}`);
            return null;
        }
        if (end_time == null)
        {
            return dateYesterday;
        }
        if(hoursDifference(new Date(end_time), dateNow) >= 24) {
            return dateYesterday;
        }
        return end_time;
    }

    const getStepsSince = async (sinceDate) => {
        const end = new Date();
        const start = new Date(sinceDate);
        const stepRows = [];
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        if (isDateYesterday(start)) {
            const yesterdayEnd = new Date();
            yesterdayEnd.setHours(23, 59, 59, 999);
            yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
            const yesterdayStepCountResult = await Pedometer.getStepCountAsync(start, yesterdayEnd);
            const todayStepCountResult = await Pedometer.getStepCountAsync(todayStart, end);
            stepRows.push({
                start_time: start.toISOString(),
                end_time: yesterdayEnd.toISOString(),
                steps: yesterdayStepCountResult.steps
            });
            stepRows.push({
                start_time: todayStart.toISOString(),
                end_time: end.toISOString(),
                steps: todayStepCountResult.steps
            });
        }
        else
        {
            const startTime = start < todayStart ? todayStart : start;
            const todayStepCountResult = await Pedometer.getStepCountAsync(startTime, end);
            if(todayStepCountResult.steps > 0) {
                stepRows.push({
                    start_time: startTime.toISOString(),
                    end_time: end.toISOString(),
                    steps: todayStepCountResult.steps
                });
            }
        }
        console.log(stepRows);
        return stepRows;
    }

    const isDateYesterday = (date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        return date.getDate() === yesterday.getDate() &&
               date.getMonth() === yesterday.getMonth() &&
               date.getFullYear() === yesterday.getFullYear();
    }

    const hoursDifference = (date1, date2) => {
        const diffInMs = date2 - date1;
        let diffInHrs = diffInMs / (1000 * 60 * 60);
        return diffInHrs;
    }

    const subscribe = async () => {
        const isAvailable = await Pedometer.isAvailableAsync();
        setIsPedometerAvailable(String(isAvailable));

        if (isAvailable) {
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);

            const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
            if (pastStepCountResult) {
                setPastStepCount(pastStepCountResult.steps);
            }

            return Pedometer.watchStepCount(result => {
                setCurrentStepCount(result.steps);
            });
        }
    };

    useEffect(() => {
        const subscription = subscribe();
    }, []);
    return null
}

export default StepSyncer;