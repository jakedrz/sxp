import { Text, View } from "react-native";
import  {colors} from "../constants/colors";
import {CardTitle} from "../components/CardTitle";

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
                <Text style={{fontSize: '20',color: colors.label.secondary}}>12,400 pts</Text>
                <Text style={{color: colors.label.tertiary}}>≈ $124.00</Text>

            </View>
        </View>
    );
}
