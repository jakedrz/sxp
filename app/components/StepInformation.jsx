import { Text, View } from "react-native";
import { colors } from "../constants/colors";
import { SymbolView } from "expo-symbols";
import { Ring } from "@/app/components/HealthRings/Ring/Ring";

import { useState, useEffect } from "react";
import { useGetUsersMostRecentGame } from "../hooks/useGetUsersMostRecentGame";

function StepInformation({ userId }) {
    const pastStepCount = 5000
    return <>
        <View style={{ paddingVertical: 40 }}>
            <Ring size='300'
                ringInfo={[
                    {
                        bgColor: colors.brand.dimmed,
                        gradient: { start: colors.brand, end: colors.brand.lighter },
                        fill: 100,
                        icon: <SymbolView name="chevron.forward" tintColor="black" weight={"bold"} size={28} />
                    },
                    {
                        bgColor: colors.ring.tertiary.dimmed,
                        gradient: { start: colors.ring.tertiary.base, end: colors.ring.tertiary.lighter },
                        fill: 80,
                        icon: <SymbolView name="chevron.forward.2" tintColor="black" weight={"bold"} size={28} />
                    },
                    {
                        bgColor: colors.ring.secondary.dimmed,
                        gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                        fill: 70,
                        icon: <SymbolView name="flame.fill" tintColor="black" weight={"bold"} size={28} />
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
        <Text style={{
            fontSize: "36",
            color: colors.brand.dynamic,
            width: "100%",
            paddingHorizontal: "20"
        }}>{pastStepCount.toLocaleString()}/10,000</Text>
    </>;
}

export default StepInformation;