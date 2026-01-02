import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { SymbolView } from "expo-symbols";
import { Ring } from "@/app/components/HealthRings/Ring/Ring";

import { useState, useEffect } from "react";
import { useGetUsersMostRecentGame } from "../hooks/useGetUsersMostRecentGame";
import { useGetTodaysSteps } from "../hooks/useGetTodaysSteps";
import { useGetUserGameStandingQuery } from "../hooks/useGetUserGameStandingQuery";

function StepInformation({ currentGame }) {
    console.log(JSON.stringify(currentGame, null, 2));
    const goal = currentGame?.games?.game_types?.goal_light;
    const todaysStepsQuery = useGetTodaysSteps(currentGame.user_id, true);
    console.log(JSON.stringify(todaysStepsQuery, null, 2))
    const pastStepCount = todaysStepsQuery.data;
    return <>
        <View style={{ paddingVertical: 40 }}>
            <Ring size='300'
                ringInfo={[
                    {
                        bgColor: colors.brand.dimmed,
                        gradient: { start: colors.brand.base, end: colors.brand.lighter },
                        fill: pastStepCount / goal * 100,
                        icon: <SymbolView name="chevron.forward" tintColor="black" weight={"bold"} size={38} />
                    // },
                    // {
                    //     bgColor: colors.ring.secondary.dimmed,
                    //     gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                    //     fill: 80,
                    //     icon: <SymbolView name="chevron.forward.2" tintColor="black" weight={"bold"} size={28} />
                    }]}
                    trackWidth={60}/>
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
            fontFamily: 'ui-rounded',
            fontWeight: '500',
            color: colors.brand.dynamic,
            width: "100%",
            paddingHorizontal: "20"
        }}>{pastStepCount.toLocaleString()}/{goal.toLocaleString()}</Text>
    </>;
}

export default StepInformation;