import {PlatformColor, ScrollView, Text, View} from "react-native";

export default function Index() {
  return (
        <ScrollView contentInsetAdjustmentBehavior="never"
        style={{
            backgroundColor: PlatformColor('systemBackground'),
        }}><Text style={{fontSize: 87, color: PlatformColor('label')}}>Edit app/games.tsx to edit this screen.</Text></ScrollView>
  );
}
