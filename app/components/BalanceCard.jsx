import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {CardTitle} from "../components/CardTitle";
import {supabase} from "../utils/supabase";
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


    const pointsLedger = supabase.channel('ledger-insert-channel')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'points_ledger', filter: `user_id=eq.${userId}` },
            (payload) => {
                queryClient.invalidateQueries('ledger')
                console.log('Change received!', payload)
            }
        )
        .subscribe( status => { console.log(status) })

    const balance = ledgerQuery.data?.at(-1)?.runningBalance;

    return (
        <View style={{
            borderRadius: 20,
            padding: 20,
            backgroundColor: colors.background.secondary,
            borderCurve: 'continuous',
            width: "90%"
        }}>
            <CardTitle text="Account Balance" fontSize={18}/>
            <Text style={{fontSize: '36', color: colors.label.secondary, marginTop: 5}}>{balance.toLocaleString()} pts</Text>
            <Text style={{fontSize: '48', color: colors.label.primary}}>≈ ${balance.toLocaleString()}.00</Text>
        </View>
    )
}