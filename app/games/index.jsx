import {DynamicColorIOS, PlatformColor, ScrollView, Text, TouchableHighlight, View} from "react-native";
import {colors} from "../constants/colors";
import {SymbolView} from 'expo-symbols';
import {Button} from "../components/Button";

export default function Index() {
    return (
        <ScrollView contentInsetAdjustmentBehavior="never"
                    contentContainerStyle={{
                        alignItems: 'center',
                    }
                    }
                    style={{
                        backgroundColor: colors.background.primary,
                    }}>
            <GameCard title="Pumpkin' Around" entry={40} players={647} pot={'25,880'}/>
            <GameCard title="No Sweat November" entry={40} players={647} pot={'25,880'}/>
            <GameCard title='Step & Destroy' entry={40} players={647} pot={'25,880'}/>
            <GameCard title="Sleighin' it" entry={40} players={647} pot={'25,880'}/>
        </ScrollView>
    );
}

function GameWagerInfoBit({symbolName, label}) {
    return <View style={{flexDirection: "column", alignItems: "center", width: "33%"}}>
        <SymbolView name={symbolName}
                    tintColor={colors.label.tertiary}
                    size={32}/>
        <Text style={{
        color: colors.label.tertiary,
        marginTop: 4,
        fontSize: 16,
    }}>
            {label}
        </Text>
    </View>;
}

function GameWagerInfoPot({value}) {
    return <GameWagerInfoBit symbolName='trophy.circle' label={`$${value} pot`}/>;
}

function GameWagerInfoPlayers({value}) {
    return <GameWagerInfoBit symbolName='person.2.circle' label={`${value} players`}/>;
}

function GameWagerInfoEntry({value}) {
    return <GameWagerInfoBit symbolName='dollarsign.circle' label={`$${value} entry`}/>;
}

function GameWagerInfo({bet, players, pot}) {
    return <View
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
        }}>
        <GameWagerInfoEntry value={bet}/>
        <GameWagerInfoPlayers value={players}/>
        <GameWagerInfoPot value={pot}/>
    </View>;
}

const GameCard = ({title, pot, entry, players}) => {
    return (
        <View style={{
            width: '90%',
            minHeight: '200',
            backgroundColor: colors.background.secondary,
            borderRadius: 20,
            padding: 20,
            marginVertical: 10,
            borderCurve: 'continuous'
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: colors.label.primary,
            }}>
                {title}
            </Text>
            <Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.label.secondary,
                }}>
                    10K steps, 5 days/week
                </Text>
            </Text>
            <Text style={{
                fontSize: 16,
                color: colors.label.tertiary,
            }}>
                Oct 20 - Nov 23 | 5 Week Game
            </Text>

            <View style={{
                borderColor: colors.separator,
                borderBottomWidth: 1,
                marginVertical: 10,
            }}/>
            <GameWagerInfo bet={entry} players={players} pot={pot}/>
            <View style={{marginTop: 20}}>
                <Button onPress={() => {}} label='Join Game'/>
            </View>
        </View>
    )
}


