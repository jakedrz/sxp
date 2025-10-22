import {PlatformColor, ScrollView, Text, View, Button} from "react-native";
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
            borderRadius: 10,
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
                <View style={{flexDirection:'row', alignItems: 'center',}}>
                    <SymbolView name='dollarsign.circle'
                    tintColor={PlatformColor('tertiaryLabel')}/><Text style={{
                        color: PlatformColor('tertiaryLabel'),
                    }}>$40 bet</Text>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <SymbolView name='person.3.fill'
                                tintColor={PlatformColor('tertiaryLabel')}/><Text style={{
                        color: PlatformColor('tertiaryLabel'),
                    }}>647 Players</Text>
                </View>
                <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <SymbolView name='trophy.circle'
                                tintColor={PlatformColor('tertiaryLabel')}/><Text style={{
                        color: PlatformColor('tertiaryLabel'),
                    }}>$26,380 pot</Text>
                </View>
            </View>
            <View style={{alignSelf: 'flex-end'}}>
            <Button title="Join Game"/>
            </View>
        </View>
    )
}