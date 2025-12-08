import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from "expo-symbols";
import {Ring} from "@/app/components/HealthRings/Ring/Ring";

import {useState, useEffect} from "react";
import {useGetUsersMostRecentGame} from "../hooks/useGetUsersMostRecentGame";

function StepInformation({userId}) {
    const pastStepCount = 5000
    return <>
        <View style={{paddingVertical: 40}}>
            <Ring size='300'
                  ringInfo={[{
                    bgColor:colors.brand.dimmed,
                    gradient: {start: colors.brand, end: colors.brand.lighter},
                    fill: 50,
                    icon: <SymbolView name="figure.walk" tintColor="black" weight={"bold"} size={32}/>
                  },
                {
                    bgColor:'gray',
                    gradient: {start: 'orange', end: 'yellow'},
                    fill: 25,
                    icon: <SymbolView name="figure.walk" tintColor="black" weight={"bold"} size={32}/>
                }]}
                  trackWidth={40}/>
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