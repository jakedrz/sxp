import {colors} from './colors';

export const ringMap = [
    {
        colorDimmed: colors.brand.dimmed,
        gradientStart: colors.brand.base,
        gradientEnd: colors.brand.lighter,
        icon: "chevron.forward",
    },
    {
        colorDimmed: colors.ring.secondary.dimmed,
        gradientStart: colors.ring.secondary.base,
        gradientEnd: colors.ring.secondary.lighter,
        icon: "chevron.forward.2",
    },
    {
        colorDimmed: colors.ring.tertiary.dimmed,
        gradientStart: colors.ring.tertiary.base,
        gradientEnd: colors.ring.tertiary.lighter,
        icon: "flame.fill",
    }
];

export const iconSizesByRingCount = [38,30,22];
export const trackWidthByRingCount = {
    large: [
        56,
        48,
    ],
    small: [
        7,
        5
    ]
}
export const trackPaddingBySize = {
    large: 5,
    small: 2
}

export default ringMap;