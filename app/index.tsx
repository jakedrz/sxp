import { Text, View, PlatformColor, Appearance, StyleSheet, DynamicColorIOS } from "react-native";
import {Pedometer} from 'expo-sensors';
import {useState, useEffect} from 'react';
import {Ring} from "@/app/components/HealthRings/Ring/Ring";

export default function Home() {
    Appearance.setColorScheme("dark");
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
    const styles = StyleSheet.create({
        label: {
            color: PlatformColor("label"),
        }
    });
    console.log(styles.label.color)
  // @ts-ignore
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: PlatformColor("systemBackground")
      }}
    >
        <Text style={styles.label}>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
        <Text style={styles.label}>Steps taken in the last 24 hours: {pastStepCount}</Text>
        <Text style={styles.label}>Walk! And watch this go up: {currentStepCount}</Text>
        <Ring radius={80} bgColor={'#2b253c'} gradientStartColor={'#A18ADF'} gradientEndColor={'#BEAAF2'} fill={90} />
    </View>
  );
}
