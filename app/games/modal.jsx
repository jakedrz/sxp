import { StyleSheet, Text, View } from 'react-native';
import {colors} from "../constants/colors";
import { InfoSection } from '../components/InfoSection';

export default function Modal() {
    return (
        <View style={styles.container}>
            <InfoSection
                title="Game Details"
                data={[
                    { label: 'Dates', value: 'Nov 15–17' },
                    { label: 'Entry Fee', value: '$10.00' },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background.grouped.primary,
    },
});
