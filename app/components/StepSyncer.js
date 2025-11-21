import {useGetLastStepWindowEnd} from "../hooks/useGetLastStepWindowEnd";
import {Pedometer} from "expo-sensors";
import {getLastStepWindowEnd} from "../utils/getLastStepWindowEnd";
import {useEffect, useState} from "react";
import {useGetUsersMostRecentGame} from "../hooks/useGetUsersMostRecentGame";

function StepSyncer({userId}) {

    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    useEffect(() => {
        setInterval(async () => {
            console.log(`generated start time: ${JSON.stringify(await getStepStartWindow(userId), null, 2)}`);
        }, 1000);
    }, []);

    const updateSteps = async (userId) => {
        await getStepStartWindow(userId);
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
}

export default StepSyncer;