import { Text, View, PlatformColor, Appearance, StyleSheet, DynamicColorIOS } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Pedometer} from 'expo-sensors';
import {useState, useEffect} from 'react';
import {Ring} from "@/app/components/HealthRings/Ring/Ring";
import {SymbolView} from 'expo-symbols';

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
  // @ts-ignore
    return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: PlatformColor("systemBackground"),
      }}
    >
        <Title/>
        {/*<Text style={styles.label}>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>*/}
        {/*<Text style={styles.label}>Steps taken in the last 24 hours: {pastStepCount}</Text>*/}
        {/*<Text style={styles.label}>Walk! And watch this go up: {currentStepCount}</Text>*/}
        <Ring radius={80} bgColor={'#2b253c'} gradientStartColor={'#A18ADF'} gradientEndColor={'#BEAAF2'} fill={7000/100} icon={<SymbolView name='figure.walk'/>}/>
        <Text style={{color: PlatformColor('label'), fontSize: '24', width: '100%', paddingHorizontal: '40', paddingTop: '40'}}>Step Count</Text>
        <Text style={{fontSize: '36', color: '#A18ADF', width: '100%', paddingHorizontal: '40'}}>{pastStepCount.toLocaleString()}/10,000</Text>
    </SafeAreaView>
  );
}

const Title = () => {
    return (
        <View style={{width:'100%'}}>
            <Text style={{fontSize: 40, fontWeight: '600', color: PlatformColor("label"), margin: 20}}>Home</Text>
        </View>
    )
}