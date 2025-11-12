import { StyleSheet, Text, View } from 'react-native';
import {colors} from "../constants/colors";
import { InfoSection } from '../components/InfoSection';
import PageHeader from '../components/PageHeader';
import { SafeAreaView } from "react-native-safe-area-context";
import {Button} from "../components/Button";
import {useLocalSearchParams} from "expo-router";

export default function Modal() {
    console.log(useLocalSearchParams());
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
                        {label: 'Entry Fee', value: '40.00 pts', numeric: true},
                        {label: 'Your Balance', value: '15.00 pts', numeric: true},
                        {label: 'Amount Needed', value: '25.00 pts', numeric: true},
                    ]}
                /></View>
            <View style={{width: '100%', padding: 16, gap: 8}}>
                <Text style={{color: colors.label.secondary, padding: 8, textAlign: 'left'}}>
                    You'll be redirected to add <Text style={{fontWeight: 'bold'}}>25 points</Text> to your account.
                    Once the transaction is complete, you'll be automatically added to the game.
                </Text>
                <Button backgroundColor={colors.brand.dynamic} textColor={colors.background.primary} label='Add Points and Join Game' minimumHeight={55}/>
                <Button label='Cancel' minimumHeight={55} textColor={colors.label.tertiary}/>
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
