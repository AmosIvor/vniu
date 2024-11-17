import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import React, {useEffect, useMemo, useState} from 'react';

import {StyleProp, StyleSheet, ViewStyle} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import LinearGradient from '../LinearGradient/LinearGradient';
import {useSkeletonContext} from './context';

type TSkeletonItemProps = {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  borderRadius?: number;
  isRandom?: boolean;
};

const SkeletonItem = ({
  borderRadius,
  height,
  style,
  width,
  isRandom,
}: TSkeletonItemProps) => {
  const animation = useSharedValue(0);

  const {borderRadius: borderRadiusContext} = useSkeletonContext();
  const widthValue = useMemo(() => (width ? sizeScale(width) : 0), [width]);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [parentDimensions, setParentDimensions] = useState({
    height: -1,
    width: -1,
  });

  const [gradientDimensions, setGradientDimensions] = useState({
    height: -1,
    width: -1,
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  useEffect(() => {
    return () => {
      cancelAnimation(translateX);
      cancelAnimation(translateY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animateAcrossDiagonal = () => {
    const overflowOffsetX = parentDimensions.width * 1;
    const overflowOffsetY = parentDimensions.height * 1;

    const leftMostEnd = -overflowOffsetX;
    const topMostEnd = -overflowOffsetY;

    const rightMostEnd =
      parentDimensions.width - gradientDimensions.width + overflowOffsetX;
    const bottomMostEnd =
      parentDimensions.height - gradientDimensions.height + overflowOffsetY;

    translateX.value = leftMostEnd;
    translateY.value = topMostEnd;

    translateX.value = withRepeat(
      withDelay(
        800,
        withTiming(rightMostEnd, {
          duration: 1000,
          easing: Easing.linear,
        }),
      ),
      -1,
    );

    translateY.value = withRepeat(
      withDelay(
        800,
        withTiming(bottomMostEnd, {
          duration: 1000,
          easing: Easing.linear,
        }),
      ),
      -1,
    );
  };

  useEffect(() => {
    if (
      parentDimensions.height !== -1 &&
      parentDimensions.width !== -1 &&
      gradientDimensions.height !== -1 &&
      gradientDimensions.width !== -1
    ) {
      animateAcrossDiagonal();
    }
  }, [parentDimensions, gradientDimensions, animateAcrossDiagonal]);

  const randomWidth = useSharedValue(widthValue);
  useDerivedValue(() => {
    if (animation.value === 0 && isRandom) {
      randomWidth.value = withTiming(
        Math.random() * (widthValue - widthValue / 2) + widthValue / 2,
      );
    }
  }, [randomWidth.value]);
  useEffect(() => {
    animation.value = withRepeat(withTiming(1, {duration: 500}), -1, true);
  }, [animation, isRandom, randomWidth]);
  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {duration: 2000}),
      Infinity,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 1], [0.2, 1]),
      width: randomWidth.value,
    };
  });

  const containerStyle: StyleProp<ViewStyle> = useMemo(() => {
    return [
      {
        backgroundColor: '#DDEAF5',
        height: height ? sizeScale(height) : 'auto',
        overflow: 'hidden',
        borderRadius: borderRadius
          ? sizeScale(borderRadius)
          : borderRadiusContext
          ? sizeScale(borderRadiusContext)
          : 0,
      },
      style,
    ];
  }, [borderRadius, borderRadiusContext, height, style]);
  return (
    <Animated.View
      style={[containerStyle, animatedStyles]}
      onLayout={event => {
        if (parentDimensions.height === -1 && parentDimensions.width === -1) {
          setParentDimensions({
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          });
        }
      }}>
      <Animated.View
        style={[animatedStyle, styles.fullWidth]}
        onLayout={event => {
          if (
            gradientDimensions.width === -1 &&
            gradientDimensions.height === -1
          ) {
            setGradientDimensions({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            });
          }
        }}>
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,0.7)',
            'rgba(255,255,255,0.6)',
            'rgba(255,255,255,0.4)',
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0)',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={[
            styles.gradient,
            {
              transform:
                parentDimensions.width > parentDimensions.height
                  ? [{rotate: '135deg'}]
                  : [{rotate: '45deg'}],
            },
          ]}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default SkeletonItem;

const styles = StyleSheet.create({
  fullWidth: {width: '100%', height: '100%'},
  gradient: {
    top: -50,
    left: -50,
    right: -20,
    bottom: -10,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    overflow: 'hidden',
  },
});
