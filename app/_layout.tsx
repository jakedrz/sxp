import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import {DynamicColorIOS, PlatformColor, AppState, AppStateStatus} from "react-native";
import {QueryClient, QueryClientProvider, focusManager} from "@tanstack/react-query";
import {useEffect} from "react";

const queryClient = new QueryClient();

export const unstable_settings = {
    initialRouteName: 'index',
};
export default function RootLayout() {
    const onAppStateChange = (status: AppStateStatus) => {
        focusManager.setFocused(status==='active');
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', onAppStateChange)

        return () => subscription.remove()
    }, [])

    return (
        <QueryClientProvider client={queryClient}><NativeTabs
            iconColor={'#A18ADF'}
        >
            <NativeTabs.Trigger name="index"
            >
                <Label>Home</Label>
                <Icon sf="figure.walk" drawable="custom_android_drawable"/>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="games">
                <Icon sf="trophy.fill" drawable="custom_settings_drawable"/>
                <Label>Games</Label>
            </NativeTabs.Trigger>
            <NativeTabs.Trigger name="profile">
                <Icon sf="person.crop.circle.fill" drawable="custom_settings_drawable"/>
                <Label>Profile</Label>
            </NativeTabs.Trigger>
        </NativeTabs></QueryClientProvider>
  );
}
