import colors from './colors';

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

export default ringMap;