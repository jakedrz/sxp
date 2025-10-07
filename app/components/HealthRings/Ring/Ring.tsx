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
};

export const Ring: React.FC<Props> = ({ radius, bgColor, gradientStartColor, gradientEndColor, fill = 0, icon }) => {
  const circleCircumference = 2 * Math.PI * radius;
  const trackWidth = 19; // matches strokeWidth
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

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative', width: 300, height: 300 }}>
      {icon && (
        <View
          style={{
            position: 'absolute',
            top: (90 - radius - trackWidth / 2),
            left: '50%',
            transform: [{ translateX: -12 }], // assuming icon is 24px wide
            zIndex: 1,
            backgroundColor: 'transparent',
            padding: 2,
          }}
        >
          {icon}
        </View>
      )}
      <Svg height="300" width="300" viewBox="0 0 180 180">
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradientEndColor as string} />
            <Stop offset="100%" stopColor={gradientStartColor as string} />
          </LinearGradient>
        </Defs>
        <G rotation={-90} originX="90" originY="90">
          <Circle cx="50%" cy="50%" r={radius} stroke={bgColor as string} fill="transparent" strokeWidth={trackWidth} />
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
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
};
