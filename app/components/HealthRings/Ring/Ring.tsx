import React, { useEffect } from 'react';
import { View } from 'react-native';
import { OpaqueColorValue } from 'react-native';
import { ReactNode } from 'react';
import Svg, { Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import ringMap, {iconSizesByRingCount} from '../../../constants/ringMap';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

// AnimatedCircle for reanimated v2+
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Gradient = {
    start: string;
    end: string;
}

type RingInfo = {
    bgColor: string,
    gradient: Gradient,
    fill: number,
    icon: React.ReactNode,
    dimmed: boolean,
}

type Props = {
    radius: number;
    ringInfo: Array<RingInfo>
    children?: ReactNode;
    size?: number;
    trackWidth?: number;
    trackPadding?: number;
};
export const Ring: React.FC<Props> = ({ size = 300, ringInfo = [{ bgColor: null, gradient: { start: null, end: null }, fill: 0, icon: null, dimmed: false }], trackWidth = 40, trackPadding=5 }) => {
    const circle = ringInfo.map((ring, index) => {
        const radius = size / 2 - trackWidth / 2 - index * (trackWidth + trackPadding);
        return {
            radius: radius,
            circumference: radius * 2 * Math.PI,
            dimmed: ring.dimmed
        }
    });
    // Use shared value for animation
    const animatedOffsets = circle.map((circle) => useSharedValue(circle.circumference));

    useEffect(() => {
        animatedOffsets.forEach((animatedOffset, index) => {
            animatedOffset.value = withTiming(
                circle[index].circumference - (circle[index].circumference * Math.min(ringInfo[index].fill, 100)) / 100,
                {
                    duration: 1500,
                    easing: Easing.out(Easing.circle),
                }
            )
        });
    }, [ringInfo, circle, animatedOffsets]);

    // Animated props for SVG Circle
    const animatedProps = animatedOffsets.map(animatedOffset => useAnimatedProps(() => ({
        strokeDashoffset: animatedOffset.value,
    })));


    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: { size },
            height: { size },
        }}>
            {ringInfo.map((ring, index) => (
                (ring.icon !== undefined) && (
                <View
                    key={index}
                    style={{
                        position: 'absolute',
                        top: -19,
                        left: '50%',
                        transform: [{ translateX: -19 }], // assuming icon is 38px wide
                        zIndex: 1,
                        backgroundColor: 'transparent',
                        paddingTop: trackWidth / 2 + index * (trackWidth + trackPadding),
                    }}
                >
                    {ring.icon === null ? ringMap[index].icon : ring.icon}
                </View>
            )))
        }
            <Svg height={size} width={size} >
                <Defs>
                    {ringInfo.map((ringInfo, index) => {
                        const startColor = ringInfo?.gradient?.start == null ? ringMap[index].gradientStart : ringInfo?.gradient?.start;
                        const endColor = ringInfo?.gradient?.end == null ? ringMap[index].gradientEnd : ringInfo?.gradient?.end;
                        return (
                            <LinearGradient key={index}id={`gradient${index}`} x1="10%" y1="0%" x2="90%" y2="0%">
                                <Stop offset="0%" stopColor={startColor as string} />
                                <Stop offset="100%" stopColor={endColor as string} />
                            </LinearGradient>
                        )
                    })}
                </Defs>
                <G rotation={-90} originX={size / 2} originY={size / 2}>
                    {ringInfo.map((ringInfo, index) => {
                        const dimColor = ringInfo.bgColor == null ? ringMap[index].colorDimmed : ringInfo.bgColor;
                        return (<Circle key={index} opacity={circle[index].dimmed ? 0.5 : 1} cx='50%' cy='50%' r={circle[index].radius} stroke={dimColor as string} fill="transparent"
                            strokeWidth={trackWidth} />)
                    })}
                    {ringInfo.map((ringInfo, index) => {
                        return (<AnimatedCircle
                            key={index}
                            r={circle[index].radius}
                            cx='50%'
                            cy='50%'
                            stroke={`url(#gradient${index})`}
                            fill="transparent"
                            strokeWidth={trackWidth}
                            strokeDasharray={circle[index].circumference}
                            animatedProps={animatedProps[index]}
                            strokeLinecap="round"
                            opacity={circle[index].dimmed ? 0.1 : 1}
                        />
                        )
                    })}
                </G>
            </Svg>
        </View>
    );
}