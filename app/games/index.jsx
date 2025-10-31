import {DynamicColorIOS, PlatformColor, ScrollView, Text, TouchableHighlight, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from 'expo-symbols';
import {Button} from "../components/Button";
import {CardTitle} from "../components/CardTitle";
import {useQuery} from '@tanstack/react-query';
import {supabase} from '../utils/supabase'

export default function Index() {
    const gamesQuery = useQuery({
        queryKey: ['games'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('games')
                .select('*')
                .order('start_date', { ascending: true });
            if (error) throw error;
            return data;
        },
    });

    // debug logging
    if (gamesQuery.isLoading) {
        console.log('games loading...');
    } else if (gamesQuery.isError) {
        console.log('games error', gamesQuery.error);
    } else {
        console.log('games loaded', gamesQuery.data);
    }

    return (
        <ScrollView contentInsetAdjustmentBehavior="never"
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingHorizontal: 16,
                    }
                    }
                    style={{
                        backgroundColor: colors.background.primary,
                    }}>

            {/*
              Render fetched games when available. Fallback to static examples while loading or if no data.
            */}
            {gamesQuery.data && gamesQuery.data.length > 0 ? (
                gamesQuery.data.map((g) => (
                    <GameCard
                        key={g.id}
                        title={g.title ?? 'Untitled'}
                        entry={g.entry_cost ?? 0}
                        players={g.players ?? 0}
                        pot={g.pot ?? '0'}
                        startDate={g.start_date}
                        endDate={g.end_date}
                    />
                ))
            ) : (
                <>
                    <GameCard title="Pumpkin' Around" entry={40} players={647} pot={'25,880'}/>
                    <GameCard title="No Sweat November" entry={40} players={647} pot={'25,880'}/>
                    <GameCard title='Step & Destroy' entry={40} players={647} pot={'25,880'}/>
                    <GameCard title="Sleighin' it" entry={40} players={647} pot={'25,880'}/>
                </>
            )}
        </ScrollView>
    );
}

function GameWagerInfoBit({symbolName, label}) {
    return <View style={{flexDirection: "column", alignItems: "center", width: "33%"}}>
        <SymbolView name={symbolName}
                    tintColor={colors.label.tertiary}
                    size={32}/>
        <Text style={{
        color: colors.label.tertiary,
        marginTop: 4,
        fontSize: 16,
    }}>
            {label}
        </Text>
    </View>;
}

function GameWagerInfoPot({value}) {
    return <GameWagerInfoBit symbolName='trophy.circle' label={`$${value} pot`}/>;
}

function GameWagerInfoPlayers({value}) {
    return <GameWagerInfoBit symbolName='person.2.circle' label={`${value} players`}/>;
}

function GameWagerInfoEntry({value}) {
    return <GameWagerInfoBit symbolName='dollarsign.circle' label={`$${value} entry`}/>;
}

function GameWagerInfo({bet, players, pot}) {
    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
        <GameWagerInfoEntry value={bet}/>
        <GameWagerInfoPlayers value={players}/>
        <GameWagerInfoPot value={pot}/>
    </View>;
}

const GameCard = ({title, pot, entry, players, startDate, endDate}) => {
    const formatDateRange = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const startDateFormattedString = startDate.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
        });

        const endDateStringMonth = (startDate.getMonth() === endDate.getMonth()) ? undefined : "short";
        const endDateFormattedString = endDate.toLocaleDateString(undefined, {
            month: endDateStringMonth,
            day: "numeric",
        });
        return `${startDateFormattedString}-${endDateFormattedString}`;
    }

    const getWeekDifference = (start, end) => {
        return (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24 * 7);
    }
    const daysUntilStart = Math.floor((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24));

    return (
        <View style={{
            minHeight: '200',
            backgroundColor: colors.background.secondary,
            borderRadius: 20,
            padding: 22,
            marginVertical: 10,
            borderCurve: 'continuous'
        }}>

            {(daysUntilStart < 7) ? (<Text style={{color: colors.label.tertiary, fontWeight: 700, fontSize: '12'}}>STARTS IN {daysUntilStart} DAYS</Text>) : null}
            <CardTitle text={title} fontSize={17}/>
            <Text style={{
                fontSize: 20,
                color: colors.label.secondary,
            }}>
                {getWeekDifference(startDate, endDate)} week game | {formatDateRange(startDate, endDate)}
            </Text>
            <Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.label.tertiary,
                }}>
                    10K steps, 5 days/week
                </Text>
            </Text>


            <View style={{
                borderColor: colors.separator,
                borderBottomWidth: 1,
                marginVertical: 10,
            }}/>
            <GameWagerInfo bet={entry} players={players} pot={pot}/>
            <View style={{marginTop: 20}}>
                <Button onPress={() => {}} label='Join Game'/>
            </View>
        </View>
    )
}
