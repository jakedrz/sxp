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

function StepInformation({ currentGame, style }) {
    console.log(JSON.stringify(currentGame, null, 2));
    const goal = [
        currentGame?.games?.game_types?.goal_light,
        currentGame?.games?.game_types?.goal_medium,
        currentGame?.games?.game_types?.goal_heavy
    ].filter(x => x !== null);
    const todaysStepsQuery = useGetTodaysSteps(currentGame.user_id, true);
    console.log(JSON.stringify(todaysStepsQuery, null, 2))
    const pastStepCount = todaysStepsQuery.data;
    return <View style={style}>
        <View style={{ paddingVertical: 20 }}>
            <Ring size='275' variant="large"
                  ringInfo={

                      goal.map(x => x !== null ? ({fill: pastStepCount / x * 100, dimmed: false}) : null)

                      //     // dimmed: !day.goalMet
                      //     //   },
                      //     //   {
                      //     //       bgColor: colors.ring.secondary.dimmed,
                      //     //       gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                      //     //       fill: 80,
                      //     // },
                      //     // {
                      //     //     bgColor: colors.ring.secondary.dimmed,
                      //     //     gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                      //     //     fill: 70,

                  }/>
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
    </View>;
}

export default StepInformation;