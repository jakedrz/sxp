import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {CardTitle} from "../components/CardTitle";
import {Button} from "../components/Button";
import {SafeAreaView} from "react-native-safe-area-context";
import * as AppleAuthentication from 'expo-apple-authentication';
import {supabase} from "../utils/supabase";
import {useEffect, useState} from "react";
import {useQuery, useQueryClient } from "@tanstack/react-query";
export default function Index() {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries();
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
        queryKey: ['ledger'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('points_ledger')
                .select('created_at, transaction_type, amount, currency, description')
                .eq('user_id', session.user.id)
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
    });

    if (ledgerQuery.isLoading) {
        console.log('balance loading...');
    } else if (ledgerQuery.isError) {
        console.log('balance error', ledgerQuery.error);
    } else {
        console.log('balance loaded', ledgerQuery.data);
    }

    if(session) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.background.primary
                }}>
                <View style={{flex: 1}}>
                    <Text style={{color: colors.label.primary}}>
                        {session.user.email}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: colors.background.primary,
                        width: '90%'
                    }}
                >
                    <View style={{
                        borderRadius: 20,
                        padding: 20,
                        backgroundColor: colors.background.secondary,
                        borderCurve: 'continuous',
                        width: "90%"
                    }}>
                        <CardTitle text="Account Balance" fontSize={18}/>
                        <Text style={{fontSize: '48', color: colors.label.primary, marginTop: 5}}>{ledgerQuery.loading ? "---" : ledgerQuery.data?.at(-1)?.runningBalance.toLocaleString()} pts</Text>
                        <Text style={{fontSize: '36', color: colors.label.secondary}}>≈ $124.00</Text>
                    </View>
                    <View style={{width: '90%', marginVertical: 40}}><Button label="Request Payout"
                                                                             backgroundColor={colors.label.primary}
                                                                             underlayColor={colors.background.primary}
                                                                             textColor={colors.background.primary}
                                                                             onPress={() => {supabase.auth.signOut()
                                                                             }}/></View>
                </View>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary, paddingHorizontal: 16}}>
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                    cornerRadius={30}
                    style={{height: 60, width: '90%'}}
                    onPress={async () => {
                        try {
                            const credential = await AppleAuthentication.signInAsync({
                                requestedScopes: [
                                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                ],
                            });
                            console.log(credential);
                            const { data, error } = await supabase.auth.signInWithIdToken({
                                provider: 'apple',
                                token: credential.identityToken
                            })
                            console.log(data);
                            console.log(error);
                            // signed in
                        } catch (e) {
                            if (e.code === 'ERR_REQUEST_CANCELED') {
                                // handle that the user canceled the sign-in flow
                            } else {
                                // handle other errors
                            }
                        }
                    }}
                />
            </SafeAreaView>
        )
    }
            }
