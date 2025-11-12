import {DynamicColorIOS, PlatformColor, ScrollView, Text, TouchableHighlight, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from 'expo-symbols';
import {Button} from "../components/Button";
import {CardTitle} from "../components/CardTitle";
import {useQuery} from '@tanstack/react-query';
import {supabase} from '../utils/supabase'
import * as Linking from 'expo-linking';
import {getWeekDifference, formatDateRange} from "../utils/dateUtil";
import {useRouter} from "expo-router";
import {Separator} from "../components/Separator";

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
                        paddingHorizontal: 8,
                    }
                    }
                    style={{
                        backgroundColor: colors.background.grouped.primary,
                    }}>
            {
                gamesQuery.data?.map((g) => (
                    <GameCard
                        key={g.id}
                        game={g}
                    />
                ))}
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

const GameCard = ({id, game}) => {
    const {title, entry_cost: entry, players, pot, start_date: startDate, end_date: endDate} = game;
    const daysUntilStart = Math.floor((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24));
    const router = useRouter();
    // id={g.id}
    // title={g.title ?? 'Untitled'}
    // entry={g.entry_cost ?? 0}
    // players={g.players ?? 0}
    // pot={g.pot ?? '0'}
    // startDate={g.start_date}
    // endDate={g.end_date}
    return (
        <View style={{
            minHeight: '200',
            backgroundColor: colors.background.grouped.secondary,
            borderRadius: 20,
            padding: 22,
            marginVertical: 10,
            borderCurve: 'continuous'
        }}>

            {   (daysUntilStart >= 0)
                    ? ((daysUntilStart < 7)
                        ? (<Text style={{color: colors.label.tertiary, fontWeight: 700, fontSize: '12'}}>STARTS IN {daysUntilStart} DAYS</Text>)
                        : null)
                    : (<Text style={{color: colors.label.tertiary, fontWeight: 700, fontSize: '12'}}>STARTED {Math.abs(daysUntilStart)} DAYS AGO</Text>)
            }
            <CardTitle text={title} fontSize={17}/>
            <Text style={{
                fontSize: 20,
                color: colors.label.secondary,
            }}>
                {getWeekDifference(startDate, endDate)} week game • {formatDateRange(startDate, endDate)}
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


            <Separator/>
            <GameWagerInfo bet={(entry)} players={players} pot={pot}/>
            <View style={{marginTop: 20}}>
                <Button onPress={async () => {
                    router.navigate(`games/modal?gameObject=${btoa(JSON.stringify(game))}`);
                }} label='Join Game' backgroundColor={colors.background.grouped.tertiary}/>
            </View>
        </View>
    )
}
