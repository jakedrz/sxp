import { Stack } from 'expo-router';
import {PlatformColor} from "react-native";


// export const unstable_settings = {
//     initialRouteName: 'games/index',
// };


export default function GamesLayout() {
    return <Stack
        screenOptions={{
            headerLargeTitle: true,
            headerTitle: 'Games',
            headerLargeTitleStyle: {
                color: PlatformColor('label'),
            },
            headerStyle: {
            },
            headerTitleStyle: {
                color: PlatformColor('label'),
            },
            headerTransparent: true,
            // headerBlurEffect: 'systemMaterial',
            // headerSearchBarOptions: {}
    }}
    />;
}
