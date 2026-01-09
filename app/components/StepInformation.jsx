import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { SymbolView } from "expo-symbols";
import { Ring } from "@/app/components/HealthRings/Ring/Ring";

import { useState, useEffect } from "react";
import { useGetUsersMostRecentGame } from "../hooks/useGetUsersMostRecentGame";
import { useGetTodaysSteps } from "../hooks/useGetTodaysSteps";
import { useGetUserGameStandingQuery } from "../hooks/useGetUserGameStandingQuery";

import { AnimatedRollingNumber } from "react-native-animated-rolling-numbers";
import { Easing } from "react-native-reanimated";

function StepInformation({ currentGame }) {
    console.log(JSON.stringify(currentGame, null, 2));
    const goal = [
        currentGame?.games?.game_types?.goal_light,
        currentGame?.games?.game_types?.goal_medium,
        currentGame?.games?.game_types?.goal_heavy
    ];
    const todaysStepsQuery = useGetTodaysSteps(currentGame.user_id, true);
    console.log(JSON.stringify(todaysStepsQuery, null, 2))
    const pastStepCount = todaysStepsQuery.data;
    // let ringColors = undefined;
    // const rings = goal.map((goal, i) => {
    //     switch(i) {
    //         case 0:
    //             ringColors = {
    //                 bgColor: colors.brand.dimmed,
    //                 start: colors.brand.base,
    //                 end: colors.brand.lighter,
    //                 icon: "chevron.forward"
    //             }
    //             break;
    //         case 1:
    //             ringColors = {
    //                 bgColor: colors.ring.secondary.dimmed,
    //                 start: colors.ring.secondary.base,
    //                 end: colors.ring.secondary.lighter,
    //                 icon: "chevron.forward.2"
    //             }
    //             break;
    //     }
    //
    //     return {bgColor: ringColors.bgColor,
    //     gradient: { start: ringColors.start, end: ringColors.end },
    //     fill: pastStepCount / goal * 100,
    //     icon: <SymbolView name={ringColors.icon} tintColor="black" weight={"bold"} size={38} />}
    // })
    return <>
        <View style={{ paddingVertical: 40 }}>
            <Ring size='300'
                ringInfo={[
                    {
                        // bgColor: colors.brand.dimmed,
                        // gradient: { start: colors.brand.base, end: colors.brand.lighter },
                        fill: pastStepCount / goal[0] * 100,
                        icon: <SymbolView name="chevron.forward" tintColor="black" weight={"bold"} size={38} />
                    },
                    {
                        fill: pastStepCount / goal[1] * 100,
                        icon: <SymbolView name="chevron.forward.2" tintColor="black" weight={"bold"} size={38} />
                    //     bgColor: colors.ring.secondary.dimmed,
                    //     gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                    //     fill: 80,
                    //     icon: <SymbolView name="chevron.forward.2" tintColor="black" weight={"bold"} size={28} />
                    }]}/>
        </View>
        <Text style={{
            color: colors.label.primary,
            fontSize: "24",
            width: "100%",
            paddingHorizontal: "20",
            paddingTop: "0"
        }}>Step
            Count</Text>
        {/*<Text style={{*/}
        {/*    fontSize: "36",*/}
        {/*    fontFamily: 'ui-rounded',*/}
        {/*    fontWeight: '600',*/}
        {/*    color: colors.brand.dynamic,*/}
        {/*    width: "100%",*/}
        {/*    paddingHorizontal: "20"*/}
        {/*}}>{pastStepCount.toLocaleString()}/{goal.toLocaleString()}</Text>*/}
        <View style={{flexDirection: 'row', width: '100%', paddingHorizontal: 20}}>
            <AnimatedRollingNumber
            value={pastStepCount}
            spinningAnimationConfig={{duration: 2000, easing: Easing.out(Easing.exp)}}
            useGrouping
            numberStyle={{fontVariant: ['tabular-nums']}}
            textStyle={{
                fontSize: '36',
                fontFamily: 'ui-rounded',
                fontWeight: '600',
                color: colors.brand.dynamic,
            }}/>
            <Text style={{
                fontSize: "36",
                fontFamily: 'ui-rounded',
                fontWeight: '600',
                color: colors.brand.dynamic,
                fontVariant: ['tabular-nums']
            }}>/{goal[0].toLocaleString()}</Text>
        </View>
    </>;
}

export default StepInformation;