import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {colors} from "../constants/colors";
import {hairlineWidth} from "react-native/Libraries/StyleSheet/StyleSheetExports";
import { Dimensions } from 'react-native';
import {Ring} from "./HealthRings/Ring/Ring";
import {SymbolView} from "expo-symbols";
import {useGetUserGameStandingQuery} from "../hooks/useGetUserGameStandingQuery";

export const GameWeeklyOverview = ({userGameId}) => {
    const userGameStandingQuery = useGetUserGameStandingQuery(userGameId, true);
    console.log(userGameStandingQuery);
    return <View style={{borderColor: 'red', borderWidth: 0, width: '100%'}}>
        <FlatList pagingEnabled contentContainerStyle={{}} horizontal data={[1, 2, 3]} renderItem={({item}) => <Week/>} keyExtractor={item => item.toString()}/>
    </View>
}

// const Ring = () => {
//     return <View style={{width: 40, height: 40, borderRadius: 5, borderWidth: 1, borderColor: colors.brand.base}}/>
// }

const Week = () => {
    const screenWidth = Dimensions.get('window').width;
    return <View style={{flexDirection: 'row', borderColor:'green', borderWidth:0, width:screenWidth, justifyContent: 'space-around', paddingHorizontal: 10}}>{[1, 2, 3, 4, 5, 6, 7].map((week, i) =>
        // <Ring radius={18} bgColor={colors.brand.dimmed} gradientStartColor={colors.brand}
        //       gradientEndColor={colors.brand.lighter}
        //       fill={50 / 100}
        //       trackWidth={6}
        //       size={40}
        //       />
        <Ring size={40} trackWidth={5} trackPadding={2}
              ringInfo={[
                  {
                      bgColor: colors.brand.dimmed,
                      gradient: { start: colors.brand, end: colors.brand.lighter },
                      fill: 100,
                  },
                  {
                      bgColor: colors.ring.tertiary.dimmed,
                      gradient: { start: colors.ring.tertiary.base, end: colors.ring.tertiary.lighter },
                      fill: 80,
                  // },
                  // {
                  //     bgColor: colors.ring.secondary.dimmed,
                  //     gradient: { start: colors.ring.secondary.base, end: colors.ring.secondary.lighter },
                  //     fill: 70,
                  }]}   />
    )}
    </View>
}