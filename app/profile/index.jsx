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
            <Text style={{color: colors.label.primary}}>Edit app/profile.tsx to edit this screen.</Text>
        </View>
    );
}
