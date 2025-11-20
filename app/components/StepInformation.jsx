import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from "expo-symbols";
import {Ring} from "@/app/components/HealthRings/Ring/Ring";

import {useState, useEffect} from "react";
import {useGetUsersMostRecentGame} from "../hooks/useGetUsersMostRecentGame";
import {useGetLastStepWindowEnd} from "../hooks/useGetLastStepWindowEnd";
import {Pedometer} from "expo-sensors";
import {getLastStepWindowEnd} from "../utils/getLastStepWindowEnd";

function StepInformation({userId}) {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    useEffect(() => {
       setInterval(async () => {
           console.log(`last step time: ${JSON.stringify(await getLastStepWindowEnd(userId), null, 2)}`);
       }, 10000);
    }, []);

    console.log(`mostrecentgame from stepinfo: ${JSON.stringify(useGetUsersMostRecentGame(userId, true), null, 2)}`)

    const updateSteps = async () => {
        //get most recent game step window end time

        //if it's null and no error, then it's the user's first time playing
        //is it before today?
        //if yes, get remainder of steps from end of window to 23:59:59
        //then get window from 00:00:00 to now
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

    return <>
        <View style={{paddingVertical: 40}}>
            <Ring radius={77} bgColor={colors.brand.dimmed} gradientStartColor={colors.brand}
                  gradientEndColor={colors.brand.lighter}
                  fill={pastStepCount / 100}
                  icon={<SymbolView name="figure.walk" tintColor="black" weight={"bold"} size={32}/>}/>
        </View>
        <Text style={{
            color: colors.label.primary,
            fontSize: "24",
            width: "100%",
            paddingHorizontal: "20",
            paddingTop: "0"
        }}>Step
            Count</Text>
        <Text style={{
            fontSize: "36",
            color: colors.brand.dynamic,
            width: "100%",
            paddingHorizontal: "20"
        }}>{pastStepCount.toLocaleString()}/10,000</Text>
    </>;
}

export default StepInformation;