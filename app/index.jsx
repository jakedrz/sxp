import { Text, View, PlatformColor, Appearance, StyleSheet, DynamicColorIOS } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Pedometer} from 'expo-sensors';
import {useState, useEffect} from 'react';
import {SkiaFitnessRing}  from './components/SkiaFitnessRing';
import {SymbolView, SymbolWeight} from 'expo-symbols';
import {Redirect} from 'expo-router';
import PageHeader from "./components/PageHeader";
import StepInformation from "./components/StepInformation";
import {colors} from './constants/colors';

const styles = StyleSheet.create({
    label: {
        color: PlatformColor("label"),
    },
    secondaryLabel: {
        color: PlatformColor("secondaryLabel"),
    }
});

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

    return (
    <SafeAreaView
        style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: colors.background.primary,
            paddingTop: 55,
        }}
    >
        <PageHeader title="Home" subtitle="Pumpkin' Around" gameInfo={`10k steps, 5 days/week
Oct 6-27`}/>
        <StepInformation pastStepCount={pastStepCount}/>
        <GameInfo/>
    </SafeAreaView>
  );
}



const GameInfo = () => {
    return (<View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:20, marginTop: 20}}>

        <InfoBit title='Your Bet' value='$40'/>
        <InfoBit title='Game Pot' value='$15,680'/>
        <InfoBit title='Players In Game' value='315' total='392'/>
    </View>)
}

const InfoBit = ({title, value, total=undefined}) => {
    return (<View>
        <Text style={[styles.label, {fontWeight: '700', fontSize:'14' }]}>{title.toUpperCase()}</Text>
        <Text style={[styles.secondaryLabel, {fontSize:'24'}]}>{value}{total ? ((<><Text style={{color: PlatformColor("tertiaryLabel"), fontSize:'20'}}> of </Text>{total}</>)):null}</Text>
    </View>)
}