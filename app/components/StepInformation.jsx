import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from "expo-symbols";
import {Ring} from "@/app/components/HealthRings/Ring/Ring";

import {useState, useEffect} from "react";

function StepInformation({pastStepCount}) {
    const [i, setI] = useState(0);
    useEffect(() => {
       setInterval(() => {
           setI(prev => prev + 10);
       }, 10000);
    }, [])
    useEffect(() => {
        console.log(i);
    }, [i]);
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