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
            height: '200',
            backgroundColor: PlatformColor('secondarySystemBackground'),
            borderRadius: 10,
            padding: 20,
            marginVertical: 10,
        }}></View>
    )
}