import { StyleSheet, Text, View } from 'react-native';
import {colors} from "../constants/colors";
import { InfoSection } from '../components/InfoSection';
import PageHeader from '../components/PageHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import {Button} from "../components/Button";

export default function Modal() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexGrow:1, width: '100%'}}><Text style={{
                textAlign: 'center',
                color: colors.label.primary,
                fontWeight: '600',
                width: '100%',
                fontSize: '24',
                paddingLeft: 8,
                marginBottom: 22
            }}>No Step Left Behind</Text>
                <InfoSection
                    title="Game Details"
                    data={[
                        {label: 'Dates', value: 'Nov 2–30'},
                        {label: 'Length', value: '4 weeks'}
                    ]}
                />
                <InfoSection
                    title="Points Summary"
                    data={[
                        {label: 'Entry Fee', value: '30.00 pts', numeric: true},
                        {label: 'Your Balance', value: '15.00 pts', numeric: true},
                        {label: 'Amount Needed', value: '15.00 pts', numeric: true},
                    ]}
                /></View>
            <View style={{width: '100%', padding: 22, gap: 8}}>
            <Button backgroundColor={colors.brand.dynamic} textColor={colors.background.primary} label='Join Game' minimumHeight={55}/>
                <Button label='Cancel' minimumHeight={55}/>
            </View>
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
