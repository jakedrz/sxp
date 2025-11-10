import { StyleSheet, Text, View } from 'react-native';
import {colors} from "../constants/colors";
import { InfoSection } from '../components/InfoSection';
import PageHeader from '../components/PageHeader';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Modal() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: colors.label.primary, width: '100%'}}>No Step Left Behind</Text>
            <InfoSection
                title="Game Details"
                data={[
                    { label: 'Dates', value: 'Nov 15–17' },
                    { label: 'Entry Fee', value: '$10.00' },
                ]}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        // justifyContent: 'center',
        backgroundColor: colors.background.grouped.primary,
    },
});
