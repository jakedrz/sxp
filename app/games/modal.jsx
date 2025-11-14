import {Linking, StyleSheet, Text, View, Alert} from 'react-native';
import {colors} from "../constants/colors";
import { InfoSection } from '../components/InfoSection';
import PageHeader from '../components/PageHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import {Button} from "../components/Button";
import {useLocalSearchParams} from "expo-router";
import {formatDateRange, getWeekDifference} from "../utils/dateUtil";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {supabase} from "../utils/supabase";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";


function ConfirmDescription({amountNeeded}) {
    const styles = StyleSheet.create({
        text: {color: colors.label.secondary, padding: 8, textAlign: "left"}});
    if (amountNeeded > 0) {
        return (<Text style={styles.text}>
            You'll be redirected to add <Text style={{fontWeight: "bold"}}>{amountNeeded} points</Text> to your
            account.
            Once the transaction is complete, you'll be automatically added to the game.
        </Text>);
    }
    else
    {
        return (<Text style={styles.text}>
            When you confirm, your account will be debited and you’ll be immediately added to the game.
        </Text>);
    }
}

export default function Modal() {
    const router = useRouter();
    const queryClient = useQueryClient();
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
    const ledgerQuery = useQuery({
        enabled: session != null,
        queryKey: ['ledger'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('points_ledger')
                .select('created_at, transaction_type, amount, currency, description')
                .eq('user_id', session?.user.id)
                .order('created_at', { ascending: true });
            if (error) throw error;
            let runningBalance = 0;
            return data.map((x) => {
                runningBalance += x.amount;
                return {
                    created_at: x.created_at,
                    transaction_type: x.transaction_type,
                    amount: x.amount,
                    currency: x.currency,
                    description: x.description,
                    runningBalance: runningBalance
                }
            });
        },
        placeholderData: [{runningBalance: '---'}]
    });
    const gameObject = JSON.parse(atob(useLocalSearchParams().gameObject));
    const userBalance = ledgerQuery.data.at(-1).runningBalance;
    const entryCost = gameObject.entry_cost;
    const amountNeeded = Math.max(0, entryCost - userBalance);
    const topUpNeeded = amountNeeded > 0;
    const pointsSummary = [
        {label: 'Entry Fee', value: `${entryCost}.00 pts`, numeric: true},
        {label: 'Available Balance', value: `${userBalance}.00 pts`, numeric: true}
    ];
    if (topUpNeeded) {
        pointsSummary.push({label: 'Amount Needed', value: `${amountNeeded}.00 pts`, numeric: true});
    }
    const buttonLabel = topUpNeeded ? 'Add Points and Join Game' : 'Join Game';

    const checkoutSessionQuery = useQuery({
        enabled: (session != null) && (topUpNeeded),
        queryKey:[gameObject.id, session?.user.id, userBalance],
        staleTime: 30*60*1000, // 30 minutes
        queryFn: async () => {
            console.log('creating checkout session for game', gameObject.id);
            return await supabase.functions.invoke('create-checkout-session', {
                body: {
                    gameId: gameObject.id}
            });
        }
    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexGrow: 1, width: '100%'}}><Text style={{
                textAlign: 'center',
                color: colors.label.primary,
                fontWeight: '600',
                width: '100%',
                fontSize: '24',
                paddingLeft: 8,
                marginBottom: 22
            }}>{gameObject.title}</Text>
                <InfoSection
                    title="Game Details"
                    data={[
                        {label: 'Dates', value: formatDateRange(gameObject.start_date, gameObject.end_date)},
                        {
                            label: 'Length',
                            value: `${getWeekDifference(gameObject.start_date, gameObject.end_date)} weeks`
                        }
                    ]}
                />
                <InfoSection
                    title="Points Summary"
                    data={pointsSummary}
                /></View>
            <View style={{width: '100%', padding: 16, gap: 8}}>
                <ConfirmDescription amountNeeded={amountNeeded}/>
                <Button backgroundColor={colors.brand.dynamic}
                        textColor={colors.background.primary}
                        label={buttonLabel}
                        minimumHeight={55}
                        onPress={() => {
                            if (topUpNeeded) {
                                if (checkoutSessionQuery.error) {

                                }
                                if (checkoutSessionQuery.data) {

                                }
                                Linking.openURL(checkoutSessionQuery.data.data.url);
                            } else {
                                Alert.alert('Joining Game',
                                    `This will debit your account {points} and add you to {gameTitle}.
Once joined, your entry can't be undone.`,
                                    [
                                        {text: 'Cancel', style: 'cancel'},
                                        {text: 'Join', isPreferred: true, style: 'default', onPress: async () => {
                                            const result = await supabase.functions.invoke('join-game', {body: {gameId: gameObject.id}});
                                            queryClient.invalidateQueries();
                                            router.back();
                                            router.navigate("/");
                                        }}
                                    ])
                            }
                        }}
                />
                <Button label='Cancel' minimumHeight={55} textColor={colors.label.tertiary} onPress={() => {
                    router.back();
                }}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        // justifyContent: 'center',
        backgroundColor: colors.background.grouped.primary,
    },
});
