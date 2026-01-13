import {PlatformColor, DynamicColorIOS} from "react-native";
export const colors = {
    brand: {
        dynamic: DynamicColorIOS({
            light: '#A18ADF',
            dark: '#A18ADF',
            highContrastLight: '#a891e7',
            highContrastDark: '#a891e7'
        }),
        base: '#a18bdfff',
        lighter: 'hsla(257, 74%, 81%, 1.00)',
        dimmed: 'hsla(256, 24%, 19%, 1.00)'
    },
    ring : {
        secondary: {
            base: 'hsla(24, 95%, 59%, 1.00)',      //
            lighter: 'hsla(24, 100%, 79%, 1.00)',   //+17, +10
            dimmed: 'hsla(24, 40%, 7%, 1.00)'     //-60, -62
        },
        tertiary: {
            base: 'hsla(59, 100%, 73%, 1.00)',      //
            lighter: 'hsla(59, 100%, 93%, 1.00)',   //+17, +10
            dimmed: 'hsla(59, 40%, 21%, 1.00)'     //-60, -62
        }
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
    separator: PlatformColor('opaqueSeparator'),
    gray: PlatformColor('systemGray3')
}