import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {CardTitle} from "../components/CardTitle";
import {Button} from "../components/Button";
import {SafeAreaView} from "react-native-safe-area-context";
import * as AppleAuthentication from 'expo-apple-authentication';
import {supabase} from "../utils/supabase";
import {useEffect, useState} from "react";
import {useQuery, useQueryClient } from "@tanstack/react-query";

export function BalanceCard({userId}) {
    //TODO: consider adding query refetch on window refocus instead of realtime
    const queryClient = useQueryClient();
    const ledgerQuery = useQuery({
        queryKey: ['ledger'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('points_ledger')
                .select('created_at, transaction_type, amount, currency, description')
                .eq('user_id', userId)
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
    if (ledgerQuery.isLoading) {
        console.log('balance loading...');
    } else if (ledgerQuery.isError) {
        console.log('balance error', ledgerQuery.error);
    } else {
        console.log('balance loaded', ledgerQuery.data);
    }


    const pointsLedger = supabase.channel('custom-insert-channel')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'points_ledger', filter: `user_id=eq.${userId}` },
            (payload) => {
                queryClient.invalidateQueries('ledger')
                console.log('Change received!', payload)
            }
        )
        .subscribe()

    return (
        <View style={{
            borderRadius: 20,
            padding: 20,
            backgroundColor: colors.background.secondary,
            borderCurve: 'continuous',
            width: "90%"
        }}>
            <CardTitle text="Account Balance" fontSize={18}/>
            <Text style={{fontSize: '48', color: colors.label.primary, marginTop: 5}}>{ledgerQuery.data?.at(-1)?.runningBalance.toLocaleString()} pts</Text>
            <Text style={{fontSize: '36', color: colors.label.secondary}}>≈ $124.00</Text>
        </View>
    )
}