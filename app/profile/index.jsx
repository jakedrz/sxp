import { Text, View } from "react-native";
import  {colors} from "../constants/colors";

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
            <View style={{borderRadius: 20, padding: 20, backgroundColor: colors.background.secondary, borderCurve: 'continuous'}}>

            </View>
        </View>
    );
}
