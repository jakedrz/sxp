import {PlatformColor, DynamicColorIOS} from "react-native";
export const colors = {
    brand: {
        dynamic: DynamicColorIOS({
            light: '#A18ADF',
            dark: '#A18ADF',
            highContrastLight: '#a891e7',
            highContrastDark: '#a891e7'
        }),
        base: '#A18ADF',
        lighter: '#BEAAF2',
        dimmed: '#2b253c'
    },
    label: {
        primary: PlatformColor('label'),
        secondary: PlatformColor('secondaryLabel'),
        tertiary: PlatformColor('tertiaryLabel')
    },
    background: {
        primary: PlatformColor('systemBackground'),
        secondary: PlatformColor('secondarySystemBackground'),
        tertiary: PlatformColor('tertiarySystemBackground'),
        grouped: {
            primary: PlatformColor('systemGroupedBackground'),
            secondary: PlatformColor('secondarySystemGroupedBackground'),
            tertiary: PlatformColor('tertiarySystemGroupedBackground'),
        }
    },
    separator: PlatformColor('opaqueSeparator')
}