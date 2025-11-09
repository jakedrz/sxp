import { StyleSheet, Text, View } from 'react-native';
import {colors} from "../constants/colors";

export default function Modal() {
    return (
        <View style={styles.container}>
            <Text style={{color: colors.label.primary}}>Modal screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background.primary,
    },
});
