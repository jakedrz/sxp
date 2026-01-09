import React, {useRef, useEffect} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {colors} from "../constants/colors";
import {Ring} from "./HealthRings/Ring/Ring";
import {useGetUserGameStandingQuery} from "../hooks/useGetUserGameStandingQuery";

export const GameWeeklyOverview = ({currentGame}) => {
    const userGameStandingQuery = useGetUserGameStandingQuery(currentGame?.id, true);
    const flatListRef = useRef(null);
    const screenWidth = Dimensions.get('window').width;
    const weeks = userGameStandingQuery.data || [];
    const computedInitialIndex = Math.max(0, weeks.findIndex(w => w.some(day => isDateToday(day.date))));

    useEffect(() => {
        // Scroll when data becomes available
        if (!weeks.length || !flatListRef.current) return;
        const idx = weeks.findIndex(w => w.some(day => isDateToday(day.date)));
        if (idx >= 0) {
            try {
                flatListRef.current.scrollToIndex({index: idx, animated: false});
            } catch (e) {
                // fallback: ignore if layout not ready
            }
        }
    }, [weeks]);
    const goal = [
        currentGame?.games?.game_types?.goal_light,
        currentGame?.games?.game_types?.goal_medium,
        currentGame?.games?.game_types?.goal_heavy
    ].filter(x => x !== null);

    return <View style={{borderColor: 'red', borderWidth: 0, width: '100%', minHeight: 72}}>
        <FlatList
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            data={userGameStandingQuery.data}
            renderItem={({item}) => <Week days={item} goal={goal}/>}
            keyExtractor={(item, index) => String(index)}
            initialScrollIndex={computedInitialIndex}
            getItemLayout={(_, index) => ({length: screenWidth, offset: screenWidth * index, index})}
        />
    </View>
}

const Week = ({days, goal}) => {
    const screenWidth = Dimensions.get('window').width;
    console.log(goal.map(x => x))
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
                <DayLabel date={day.date} goalMet={day.goalMet}/>
                <Ring size={38} variant="small"//good for 1 ring
                      ringInfo={

                          goal.map(x => x !== null ? ({fill: day.steps / x * 100, dimmed: false}) : null)

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
        )}
    </View>
}

const DayLabel = ({date, goalMet}) => {
    const dateIsToday = isDateToday(date);
    const diameter = 18;
    const color = goalMet === "light" ? colors.brand.dynamic : goalMet === "medium" ? colors.ring.secondary.base : goalMet === "heavy" ? colors.ring.tertiary.base : dateIsToday ? colors.gray : null;
    const textColor = color ? colors.label.primary : colors.label.secondary;
    const dateObj = new Date(Date.parse(date));
    const fillCircle = goalMet || dateIsToday;
    return <View style={{
        marginBottom: 8,
        height: diameter,
        width: diameter,
        borderRadius: diameter / 2,
        backgroundColor: fillCircle ? color : null,
        alignItems: 'center',
        justifyContent: 'center',
        // opacity: dateIsToday ? 1 : 0.5
    }}>
        <Text style={{fontFamily: 'ui-rounded', color: textColor, fontSize: 12, fontWeight: dateIsToday ? '800': '400'}}>
            {dateObj.toUTCString().charAt(0)}
        </Text>
    </View>;
}

const isDateToday = (dateString) => {
    // Accept "YYYY-MM-DD" or "YYYY-MM-DDT..." — only use the date portion
    if (!dateString) return false;
    const datePart = dateString.split('T')[0];
    const parts = datePart.split('-');
    if (parts.length !== 3) return false;

    const [y, m, d] = parts;
    const year = parseInt(y, 10);
    const monthIndex = parseInt(m, 10) - 1; // JS months are 0-based
    const day = parseInt(d, 10);

    if (Number.isNaN(year) || Number.isNaN(monthIndex) || Number.isNaN(day)) return false;

    // Construct a local-midnight Date for the given date
    const localDate = new Date(year, monthIndex, day);

    const now = new Date();
    return localDate.getFullYear() === now.getFullYear()
        && localDate.getMonth() === now.getMonth()
        && localDate.getDate() === now.getDate();
}