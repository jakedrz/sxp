import {colors} from "../constants/colors";
import {Text, TouchableHighlight, View} from "react-native";

export const Button = ({label, textColor=colors.brand.dynamic, onPress, backgroundColor=colors.background.tertiary, underlayColor="white"}) => {

    return (
        <TouchableHighlight
            underlayColor={underlayColor}
            style={{
                overflow: 'hidden',
                borderRadius: 30,
                borderCurve: 'continuous',
            }}
            onPress={onPress}>
            <View style={{
                backgroundColor: backgroundColor,
                minHeight: 45,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: textColor,
                    fontSize: 18, fontWeight: 500
                }}>{label}</Text>
            </View>
        </TouchableHighlight>
    )
}