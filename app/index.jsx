import {Appearance, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from 'react';
import PageHeader from "./components/PageHeader";
import StepInformation from "./components/StepInformation";
import {colors} from './constants/colors';
import {useQuery} from "@tanstack/react-query";
import {supabase} from "./utils/supabase";
import {formatDateRange} from "./utils/dateUtil";
import StepSyncer from "./components/StepSyncer";
import {GameWeeklyOverview} from "./components/GameWeeklyOverview";

export default function Home() {
    Appearance.setColorScheme("dark");


    const [session, setSession] = useState(null)
    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: {session},
            } = await supabase.auth.getSession()
            setSession(session)
        }

        fetchSession()

        // subscribe to auth state changes
        const {data: subscription} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.subscription.unsubscribe()
    }, []);

    const currentGameQuery = useQuery({
        queryKey: ['currentGame'],
        queryFn: async () => {
            const {data, error} = await supabase
                .from('user_games')
                .select('id, user_id, games (id, title, entry_cost, start_date, end_date, game_types (title, goal_light, days_light, goal_medium, days_medium, goal_heavy, days_heavy)), status, joined_at, forfeited_at, won_at, lost_at')
                .eq('user_id', session.user.id)
                .order('joined_at', {ascending: false})
                .limit(1)
                .maybeSingle();
            if (error) throw error;
            return data;
        },
        placeholderData: [null]
    });

    const currentGameParticipantsQuery = useQuery({
        enabled: currentGameQuery.isSuccess,
        queryKey: ['currentGameParticipants', currentGameQuery.data?.games?.id],
        queryFn: async () => {
            const  {data, error} = await supabase
                .from('user_games')
                .select('id, status')
                .eq('game_id', currentGameQuery.data?.games?.id);
            if (error) throw error;
            return data;
        }
    })
    if (currentGameQuery.data) {
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: colors.background.primary,
                paddingTop: 55,
            }}
        >
            <PageHeader title="Home" subtitle={currentGameQuery.data?.games?.title}
                        gameInfo={currentGameQuery.data?.games ? (`${currentGameQuery.data?.games?.game_types?.title}
${formatDateRange(currentGameQuery.data?.games?.start_date, currentGameQuery.data?.games?.end_date)}`) : null}/>

            {currentGameQuery.data?.games ? (
                    <>
                        <GameWeeklyOverview currentGame={currentGameQuery.data}/>
                        <StepSyncer userId={session.user.id}/>
                        <StepInformation currentGame={currentGameQuery.data}/>
                        <GameInfo game={currentGameQuery.data?.games} participants={currentGameParticipantsQuery.data}/></>
                )
                : <Text style={{color: colors.label.primary}}>You are not currently in a game. Join a game to start
                    tracking your steps!</Text>}
        </SafeAreaView>
    );
}


const GameInfo = ({game, participants}) => {
    const activeParticipants = participants?.filter(p => p.status === 'joined' || p.status === 'won').length;
    const totalParticipants = participants?.filter(p => p.status !== 'warmup_forfeited').length;
    return (<View style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20
    }}>

        <InfoBit title='Your Bet' value={`$${game?.entry_cost}`}/>
        <InfoBit title='Game Pot' value={`$${(game?.entry_cost * totalParticipants).toLocaleString()}`}/>
        <InfoBit title='Players In Game' value={activeParticipants} total={totalParticipants}/>
    </View>)
}

const InfoBit = ({title, value, total = undefined}) => {
    return (<View>
        <Text style={{color: colors.label.primary, fontWeight: '700', fontSize: '14'}}>{title.toUpperCase()}</Text>
        <Text style={{color: colors.label.secondary, fontSize: '24', fontFamily: 'ui-rounded'}}>{value}{total ? ((<><Text
            style={{color: colors.label.tertiary, fontSize: '20'}}> of </Text>{total}</>)) : null}</Text>
    </View>)
}