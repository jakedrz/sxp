import React, { useEffect } from 'react';
import { View } from 'react-native';
import { OpaqueColorValue } from 'react-native';
import { ReactNode } from 'react';
import Svg, { Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
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
    icon: React.ReactNode
}

type Props = {
  radius: number;
  ringInfo: Array<RingInfo>
  children?: ReactNode;
  size?: number;
  trackWidth?: number;
};

export const Ring: React.FC<Props> = ({ size=300, ringInfo=[{bgColor: '#000000', gradient: {start:'#000000', end:'#000000'}, fill: 0, icon: null}], trackWidth=25 }) => {
    const circleCircumference = 2 * Math.PI * size / 2;
    // Use shared value for animation
    const animatedOffset = useSharedValue(circleCircumference);

    useEffect(() => {
        animatedOffset.value = withTiming(
            circleCircumference - (circleCircumference * ringInfo[0].fill) / 100,
            {
                duration: 1000,
                easing: Easing.inOut(Easing.sin),
            }
        );
    }, [ringInfo[0].fill, circleCircumference, animatedOffset]);

    // Animated props for SVG Circle
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: animatedOffset.value,
    }));

    const circleRadius = size / 2 - trackWidth / 2;

    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: {size},
            height: {size}
        }}>
            {ringInfo[0].icon && (
                <View
                    style={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: [{translateX: -16}], // assuming icon is 32px wide
                        zIndex: 1,
                        backgroundColor: 'transparent',
                        paddingTop: trackWidth/2,
                    }}
                >
                    {ringInfo[0].icon}
                </View>
            )}
            <Svg height={size} width={size}>
                <Defs>
                    {ringInfo.map((ringInfo, index) => {
                        return (
                            <LinearGradient id={`gradient${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <Stop offset="0%" stopColor={ringInfo.gradient.start as string}/>
                                <Stop offset="100%" stopColor={ringInfo.gradient.end as string}/>
                            </LinearGradient>
                        )
                    })}
                </Defs>
                <G rotation={-90} originX={size / 2} originY={size / 2}>
                    <Circle cx='50%' cy='50%' r={circleRadius} stroke={ringInfo[0].bgColor as string} fill="transparent"
                            strokeWidth={trackWidth}/>
                    <AnimatedCircle
                        r={circleRadius}
                        cx='50%'
                        cy='50%'
                        stroke="url(#gradient0)"
                        fill="transparent"
                        strokeWidth={trackWidth}
                        strokeDasharray={circleCircumference}
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
        </View>
    );
}