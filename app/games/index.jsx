import {
    PlatformColor,
    ScrollView,
    Text,
    View,
    Button,
    Touchable,
    TouchableHighlight,
    DynamicColorIOS
} from "react-native";
import {SymbolView, SymbolWeight} from 'expo-symbols';

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
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
        </ScrollView>
  );
}

const GameCard = () => {
    return (
        <View style={{
            width: '90%',
            minHeight: '200',
            backgroundColor: PlatformColor('secondarySystemBackground'),
            borderRadius: 20,
            padding: 20,
            marginVertical: 10,
            borderCurve:'continuous'
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: PlatformColor('label'),
            }}>
                Fall Foliage Hike
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
            <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <View style={{flexDirection:'column', alignItems: 'center',}}>
                    <SymbolView name='dollarsign.circle'
                    tintColor={PlatformColor('tertiaryLabel')}
                    size={32}/><Text style={{
                        color: PlatformColor('tertiaryLabel'),
                    fontSize: 16,
                    }}>$40 bet</Text>
                </View>
                <View style={{flexDirection:'column', alignItems: 'center'}}>
                    <SymbolView name='person.3.fill'
                                size={32}
                                tintColor={PlatformColor('tertiaryLabel')}/><Text style={{
                        color: PlatformColor('tertiaryLabel'),
                        fontSize: 16,
                    }}>647 Players</Text>
                </View>
                <View style={{flexDirection:'column', alignItems: 'center'}}>
                    <SymbolView name='trophy.circle'
                                size={32}
                                tintColor={PlatformColor('tertiaryLabel')}/><Text style={{
                                    fontSize: 16,
                        color: PlatformColor('tertiaryLabel'),
                    }}>$26,380 pot</Text>
                </View>
            </View>
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
        style={{borderRadius: 30, borderCurve:'continuous'}}
        onPress={() => console.log('hi')}>
            <View style={{
            backgroundColor:PlatformColor('tertiarySystemBackground'),
                minHeight: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:30,
                borderCurve:'continuous',
        }}>
            <Text style={{color: color,
            fontSize: 18, fontWeight:500}}>Join Game</Text>
            </View>
        </TouchableHighlight>
    )
}