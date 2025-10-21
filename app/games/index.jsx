import {PlatformColor, ScrollView, Text, View} from "react-native";

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
        }}>
            <Text style={{
                fontSize: 24,
                fontWeight: '700',
                color: PlatformColor('label'),
            }}>
                Fall Foliage Hike
            </Text>
            <Text style={{
                fontSize: 16,
                color: PlatformColor('secondaryLabel'),
            }}>
                Oct 20 - Nov 23 | 5 Week Game
            </Text>
            <Text>
                <Text style={{
                    fontSize: 16,
                    color: PlatformColor('secondaryLabel'),
                }}>
                    10K steps, 5 days/week
                </Text>
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
                <View>
                    <Text style={{
                        fontSize: 16,
                        color: PlatformColor('tertiaryLabel'),
                    }}>$40 bet</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 16,
                        color: PlatformColor('tertiaryLabel'),
                    }}>647 Players</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 16,
                        color: PlatformColor('tertiaryLabel'),
                    }}>$26,380 pot</Text>
                </View>
            </View>
        </View>
    )
}