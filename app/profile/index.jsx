import {Text, View} from "react-native";
import {colors} from "../constants/colors";
import {CardTitle} from "../components/CardTitle";
import {Button} from "../components/Button";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background.primary}}>
            <View style={{flex: 1}}>
                <Text style={{color: colors.label.primary}}>
                    jake.drzewiecki@gmail.com
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.background.primary,
                    width: '90%'
                }}
            >
                <View style={{
                    borderRadius: 20,
                    padding: 20,
                    backgroundColor: colors.background.secondary,
                    borderCurve: 'continuous',
                    width: "90%"
                }}>
                    <CardTitle text="Account Balance" fontSize={18}/>
                    <Text style={{fontSize: '48', color: colors.label.primary, marginTop: 5}}>12,400 pts</Text>
                    <Text style={{fontSize: '36', color: colors.label.secondary}}>≈ $124.00</Text>
                </View>
                <View style={{width: '90%', marginVertical: 40}}><Button label="Request Payout"
                                                                         backgroundColor={colors.label.primary}
                                                                         underlayColor={colors.background.primary}
                                                                         textColor={colors.background.primary}
                                                                         onPress={() => {
                                                                         }}/></View>
            </View>
        </SafeAreaView>
            );
            }
