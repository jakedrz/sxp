import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ColorValue } from 'react-native';
import { ReactNode } from 'react';
import Svg, { Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

// AnimatedCircle for reanimated v2+
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  radius: number;
  bgColor: OpaqueColorValue;
  gradientStartColor: OpaqueColorValue;
  gradientEndColor: OpaqueColorValue;
  children?: ReactNode;
  fill?: number;
  icon?: React.ReactNode;
  size?: number;
  trackWidth?: number;
};

export const Ring: React.FC<Props> = ({ size=300, bgColor, gradientStartColor, gradientEndColor, fill = 0, icon, trackWidth=25 }) => {
    const circleCircumference = 2 * Math.PI * size / 2;
    // Use shared value for animation
    const animatedOffset = useSharedValue(circleCircumference);

    useEffect(() => {
        animatedOffset.value = withTiming(
            circleCircumference - (circleCircumference * fill) / 100,
            {
                duration: 1000,
                easing: Easing.inOut(Easing.sin),
            }
        );
    }, [fill, circleCircumference, animatedOffset]);

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
            {icon && (
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
                    {icon}
                </View>
            )}
            <Svg height={size} width={size}>
                <Defs>
                    <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor={gradientEndColor as string}/>
                        <Stop offset="100%" stopColor={gradientStartColor as string}/>
                    </LinearGradient>
                </Defs>
                <G rotation={-90} originX={size / 2} originY={size / 2}>
                    <Circle cx='50%' cy='50%' r={circleRadius} stroke={bgColor as string} fill="transparent"
                            strokeWidth={trackWidth}/>
                    <AnimatedCircle
                        r={circleRadius}
                        cx='50%'
                        cy='50%'
                        stroke="url(#gradient)"
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