import React from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {colors} from "../constants/colors";
import {Ring} from "./HealthRings/Ring/Ring";
import {useGetUserGameStandingQuery} from "../hooks/useGetUserGameStandingQuery";

export const GameWeeklyOverview = ({currentGame}) => {
    const userGameStandingQuery = useGetUserGameStandingQuery(currentGame?.id, true);
    const goal = currentGame?.games?.game_types?.goal_light;
    return <View style={{borderColor: 'red', borderWidth: 0, width: '100%'}}>
        <FlatList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={userGameStandingQuery.data}
            renderItem={({item}) => <Week days={item} goal={goal}/>}
            keyExtractor={(item, index) => index}/>
    </View>
}

const Week = ({days, goal}) => {
    const screenWidth = Dimensions.get('window').width;
    return <View style={{
        flexDirection: 'row',
        borderColor: 'green',
        borderWidth: 0,
        width: screenWidth,
        justifyContent: 'space-around',
        paddingHorizontal: 5,
        marginTop: 8
    }}>
        {days.map((day, i) =>
            // <Ring size={40} trackWidth={5} trackPadding={2} //good for 2 rings
            <View key={day.date} style={{alignItems: 'center'}}>
                <DayLabel date={new Date()} color={(i===4) ? colors.brand.base : null}/>
                <Ring size={38} trackWidth={7} trackPadding={2} //good for 1 ring
                                       ringInfo={[
                                           {
                                               bgColor: colors.brand.dimmed,
                                               gradient: {start: colors.brand.base, end: colors.brand.lighter},
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
                                           }]}/>

            </View>
        )}
    </View>
}

const DayLabel = ({date, color = null}) => {
    const diameter = 18;
    const textColor = color ? colors.label.primary : colors.label.secondary;
    return <View style={{ marginBottom: 8, height: diameter, width: diameter, borderRadius: diameter/2, backgroundColor: color, alignItems: 'center' }}>
        <Text style={{color: textColor, fontSize: 12, lineHeight: diameter}}>
            {new Date().toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
        </Text>
    </View>;
}