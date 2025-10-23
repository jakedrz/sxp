import {DynamicColorIOS, PlatformColor, ScrollView, Text, TouchableHighlight, View} from "react-native";
import {SymbolView} from 'expo-symbols';

export default function Index() {
    return (
        <ScrollView contentInsetAdjustmentBehavior="never"
                    contentContainerStyle={{
                        alignItems: 'center',
                    }
                    }
                    style={{
                        backgroundColor: PlatformColor('systemBackground'),
                    }}>
            <GameCard title="Pumpkin' around" entry={40} players={647} pot={'25,880'}/>
            <GameCard title="No Sweat November" entry={40} players={647} pot={'25,880'}/>
            <GameCard title='Step & Destroy' entry={40} players={647} pot={'25,880'}/>
            <GameCard title="Sleighin' it" entry={40} players={647} pot={'25,880'}/>
        </ScrollView>
    );
}

function GameWagerInfoBit({symbolName, label}) {
    return <View style={{flexDirection: "column", alignItems: "center", width: "33%"}}>
        <SymbolView name={symbolName}
                    tintColor={PlatformColor("tertiaryLabel")}
                    size={32}/>
        <Text style={{
        color: PlatformColor("tertiaryLabel"),
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
            backgroundColor: PlatformColor('secondarySystemBackground'),
            borderRadius: 20,
            padding: 20,
            marginVertical: 10,
            borderCurve: 'continuous'
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: PlatformColor('label'),
            }}>
                {title}
            </Text>
            <Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: PlatformColor('secondaryLabel'),
                }}>
                    10K steps, 5 days/week
                </Text>
            </Text>
            <Text style={{
                fontSize: 16,
                color: PlatformColor('tertiaryLabel'),
            }}>
                Oct 20 - Nov 23 | 5 Week Game
            </Text>

            <View style={{
                borderColor: PlatformColor('opaqueSeparator'),
                borderBottomWidth: 1,
                marginVertical: 10,
            }}/>
            <GameWagerInfo bet={entry} players={players} pot={pot}/>
            <View style={{marginTop: 20}}>
                <JoinButton/>
            </View>
        </View>
    )
}
const color = DynamicColorIOS({
    dark: '#A18ADF',
    highContrastDark: '#a891e7'
})


const JoinButton = () => {

    return (
        <TouchableHighlight
            underlayColor="white"
            style={{
                overflow: 'hidden',
                borderRadius: 30,
                borderCurve: 'continuous',
            }}
            onPress={() => console.log('hi')}>
            <View style={{
                backgroundColor: PlatformColor('tertiarySystemBackground'),
                minHeight: 45,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    color: color,
                    fontSize: 18, fontWeight: 500
                }}>Join Game</Text>
            </View>
        </TouchableHighlight>
    )
}