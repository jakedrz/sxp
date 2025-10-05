import React, { useEffect } from 'react';
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
    <Svg height="300" width="300" viewBox="0 0 180 180" style={{ position: 'absolute' }}>
      <Defs>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={gradientEndColor as string} />
          <Stop offset="100%" stopColor={gradientStartColor as string} />
        </LinearGradient>
      </Defs>
      <G rotation={-90} originX="90" originY="90">
        <Circle cx="50%" cy="50%" r={radius} stroke={bgColor as string} fill="transparent" strokeWidth="19" />
        <AnimatedCircle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth="19"
          strokeDasharray={circleCircumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
        <G transform={`translate(180 ${85 - radius})`}>
          <G transform={`rotate(-90 ${radius} 0) rotate(180)`}>{icon}</G>
        </G>
      </G>
    </Svg>
  );
};
