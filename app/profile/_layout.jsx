import { Stack } from 'expo-router';
import {PlatformColor} from "react-native";


export const unstable_settings = {
    initialRouteName: 'index',
};


export default function ProfileLayout() {
    return <Stack
        screenOptions={{
            headerLargeTitle: true,
            headerTitle: 'Profile',
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
        }}/>;
}
