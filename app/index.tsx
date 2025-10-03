import { Text, View, PlatformColor, Appearance } from "react-native";

export default function Home() {
    Appearance.setColorScheme("dark");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      //   backgroundColor: PlatformColor("systemBackground")
      }}
    >
      <Text
      // style={{color: PlatformColor("label")}}
        >Edit app/home.tsx to edit this screen.
        </Text>
    </View>
  );
}
