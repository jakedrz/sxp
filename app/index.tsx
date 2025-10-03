import { Text, View, PlatformColor, Appearance } from "react-native";
import {Pedometer} from 'expo-sensors';
import {useState, useEffect} from 'react';
import {Ring} from "@/app/components/HealthRings/Ring/Ring";

export default function Home() {
    // Appearance.setColorScheme("dark");
    const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
    const [pastStepCount, setPastStepCount] = useState(0);
    const [currentStepCount, setCurrentStepCount] = useState(0);

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      //   backgroundColor: PlatformColor("systemBackground")
      }}
    >
        <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
        <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
        <Text>Walk! And watch this go up: {currentStepCount}</Text>
        <Ring radius={80} bgColor={'gray'} gradientStartColor={'red'} gradientEndColor={'pink'} fill={100} />
    </View>
  );
}
