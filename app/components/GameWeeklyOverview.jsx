import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { colors } from "../constants/colors";
import { hairlineWidth } from "react-native/Libraries/StyleSheet/StyleSheetExports";
import { Dimensions } from 'react-native';
import { Ring } from "./HealthRings/Ring/Ring";
import { SymbolView } from "expo-symbols";
import { useGetUserGameStandingQuery } from "../hooks/useGetUserGameStandingQuery";

export const GameWeeklyOverview = ({ currentGame }) => {
    const userGameStandingQuery = useGetUserGameStandingQuery(currentGame?.id, true);
    const goal = currentGame?.games?.game_types?.goal_light;
    return <View style={{ borderColor: 'red', borderWidth: 0, width: '100%' }}>
        <FlatList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={userGameStandingQuery.data}
            renderItem={({ item }) => <Week days={item} goal={goal} />}
            keyExtractor={(item, index) => index} />
    </View>
}

const Week = ({ days, goal }) => {
    const screenWidth = Dimensions.get('window').width;
    return <View style={{ flexDirection: 'row', borderColor: 'green', borderWidth: 0, width: screenWidth, justifyContent: 'space-around', paddingHorizontal: 5, marginTop:15 }}>{days.map((day, i) =>
        // <Ring radius={18} bgColor={colors.brand.dimmed} gradientStartColor={colors.brand}
        //       gradientEndColor={colors.brand.lighter}
        //       fill={50 / 100}
        //       trackWidth={6}
        //       size={40}
        //       />
        // <Ring size={40} trackWidth={5} trackPadding={2} //good for 2 rings
        <Ring key={day.date} size={38} trackWidth={7} trackPadding={2} //good for 1 ring
            ringInfo={[
                {
                    bgColor: colors.brand.dimmed,
                    gradient: { start: colors.brand.base, end: colors.brand.lighter },
                    fill: day.steps / goal * 100,
                    //   },
                    //   {
                    //       bgColor: colors.ring.secondary.dimmed,
                    //       gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                    //       fill: 80,
                    // },
                    // {
                    //     bgColor: colors.ring.secondary.dimmed,
                    //     gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                    //     fill: 70,
                }]} />
    )}
    </View>
}