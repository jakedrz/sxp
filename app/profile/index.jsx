import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {Button} from "../components/Button";
import {SafeAreaView} from "react-native-safe-area-context";
import * as AppleAuthentication from 'expo-apple-authentication';
import {supabase} from "../utils/supabase";
import {useEffect, useState} from "react";
import {useQuery, useQueryClient } from "@tanstack/react-query";
import {BalanceCard} from "../components/BalanceCard";
export default function Index() {
    const [session, setSession] = useState(null)
    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setSession(session)
        }

        fetchSession()

        // subscribe to auth state changes
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.subscription.unsubscribe()
    }, []);

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
                <BalanceCard userId={session.user.id}/>
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
                            const { data, error } = await supabase.auth.signInWithIdToken({
                                provider: 'apple',
                                token: credential.identityToken
                            })
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
