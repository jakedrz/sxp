import { Text, View, PlatformColor, Appearance, StyleSheet, DynamicColorIOS } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Pedometer} from 'expo-sensors';
import {useState, useEffect} from 'react';
import {Ring} from "@/app/components/HealthRings/Ring/Ring";
import {SymbolView, SymbolWeight} from 'expo-symbols';

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
        backgroundColor: PlatformColor("systemBackground"),
      }}
    >
        <Title/>
        <View style={{width:'100%', paddingHorizontal:20}}>
            <Text style={[styles.secondaryLabel, {fontSize: 18}]}>Oct 6-27</Text>
            <Text style={[styles.secondaryLabel, {fontSize: 18}]}>10k steps, 5 days/week</Text>
        </View>
        {/*<Text style={styles.label}>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>*/}
        {/*<Text style={styles.label}>Steps taken in the last 24 hours: {pastStepCount}</Text>*/}
        {/*<Text style={styles.label}>Walk! And watch this go up: {currentStepCount}</Text>*/}
        <View style={{paddingVertical: 40}}><Ring radius={80} bgColor={'#2b253c'} gradientStartColor={'#A18ADF'} gradientEndColor={'#BEAAF2'}
                 fill={pastStepCount / 100} icon={<SymbolView name='figure.walk' tintColor='black' weight={'bold'}/>}/></View>
        <Text style={[styles.label, {fontSize: '24', width: '100%', paddingHorizontal: '20', paddingTop: '20'}]}>Step Count</Text>
        <Text style={{fontSize: '36', color: '#A18ADF', width: '100%', paddingHorizontal: '20'}}>{pastStepCount.toLocaleString()}/10,000</Text>
        <GameInfo/>
    </SafeAreaView>
  );
}

const Title = () => {
    return (
        <View style={{width:'100%'}}>
            <Text style={[styles.label, {fontSize: 40, fontWeight: '600', marginHorizontal: 20}]}>Goal Getter</Text>
        </View>
    )
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