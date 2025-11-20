import { Text, View, PlatformColor, Appearance, StyleSheet, DynamicColorIOS } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Pedometer} from 'expo-sensors';
import {useState, useEffect} from 'react';
import {SkiaFitnessRing}  from './components/SkiaFitnessRing';
import {SymbolView, SymbolWeight} from 'expo-symbols';
import {Redirect} from 'expo-router';
import PageHeader from "./components/PageHeader";
import StepInformation from "./components/StepInformation";
import {colors} from './constants/colors';
import {useQuery, useQueryClient } from "@tanstack/react-query";
import {supabase} from "./utils/supabase";
import { formatDateRange } from "./utils/dateUtil";

export default function Home() {
    Appearance.setColorScheme("dark");


    const [session, setSession] = useState(null)
    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setSession(session)
            console.log(session);
        }

        fetchSession()

        // subscribe to auth state changes
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.subscription.unsubscribe()
    }, []);

    const currentGameQuery = useQuery({
        queryKey: ['currentGame'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('user_games')
                .select('id, user_id, games (id, title, entry_cost, start_date, end_date), status, joined_at, forfeited_at, won_at, lost_at')
                .eq('user_id', session.user.id)
                .order('joined_at', { ascending: false })
                .limit(1)
                .maybeSingle();
            if (error) throw error;
            return data;
        },
        placeholderData: [null]
    });
    if(currentGameQuery.data)
    {
        console.log(JSON.stringify(currentGameQuery.data, null, 2));
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
        <PageHeader title="Home" subtitle={currentGameQuery.data?.games?.title} gameInfo={currentGameQuery.data?.games ? (`10k steps, 5 days/week
${formatDateRange(currentGameQuery.data?.games?.start_date, currentGameQuery.data?.games?.end_date)}`) : null}/>

        {currentGameQuery.data?.games ? (
        <><StepInformation userId={session.user.id}/>
        <GameInfo game={currentGameQuery.data?.games}/></>
            )
            : <Text style={{color: colors.label.primary}}>You are not currently in a game. Join a game to start tracking your steps!</Text>}
    </SafeAreaView>
  );
}



const GameInfo = ({game}) => {
    return (<View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:20, marginTop: 20}}>

        <InfoBit title='Your Bet' value={`$${game?.entry_cost}`}/>
        <InfoBit title='Game Pot' value='$15,680'/>
        <InfoBit title='Players In Game' value='315' total='392'/>
    </View>)
}

const InfoBit = ({title, value, total=undefined}) => {
    return (<View>
        <Text style={{color: colors.label.primary, fontWeight: '700', fontSize:'14' }}>{title.toUpperCase()}</Text>
        <Text style={{color: colors.label.secondary, fontSize:'24'}}>{value}{total ? ((<><Text style={{color: colors.label.tertiary, fontSize:'20'}}> of </Text>{total}</>)):null}</Text>
    </View>)
}