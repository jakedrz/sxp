import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from "expo-symbols";
import {Ring} from "@/app/components/HealthRings/Ring/Ring";

import {useState, useEffect} from "react";
import {Pedometer} from "expo-sensors";

function StepInformation() {
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);
    useEffect(() => {
       setInterval(() => {
           updateSteps();
       }, 10000);
    }, []);

    const updateSteps = async () => {

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