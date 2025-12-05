import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {colors} from "../constants/colors";
import {hairlineWidth} from "react-native/Libraries/StyleSheet/StyleSheetExports";
import { Dimensions } from 'react-native';
import {Ring} from "./HealthRings/Ring/Ring";
import {SymbolView} from "expo-symbols";

export const GameWeeklyOverview = () => {
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
        <Ring radius={18} bgColor={colors.brand.dimmed} gradientStartColor={colors.brand}
              gradientEndColor={colors.brand.lighter}
              fill={50 / 100}
              trackWidth={6}
              size={40}
              />
    )}
    </View>
}