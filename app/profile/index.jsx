import { Text, View } from "react-native";
import  {colors} from "../constants/colors";
import {CardTitle} from "../components/CardTitle";
import {Button} from "../components/Button";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.background.primary
            }}
        >
            <View style={{borderRadius: 20, padding: 20, backgroundColor: colors.background.secondary, borderCurve: 'continuous', width:"90%"}}>
                <CardTitle text="Account Balance"/>
                <Text style={{fontSize: '20',color: colors.label.secondary, marginTop: 5}}>12,400 pts</Text>
                <Text style={{fontSize: '20',color: colors.label.tertiary}}>≈ $124.00</Text>
            </View>
            <View style={{width: '90%', marginVertical: 40}}><Button label="Request Payout" backgroundColor={'white'} textColor={'black'}/></View>
        </View>
    );
}
