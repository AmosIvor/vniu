import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import React from 'react';

import {Pressable, StyleSheet, View} from 'react-native';

import {Layout} from '../Layout';
import SvgIcon from '../SvgIcon/SvgIcon';

export type TCard = {
  id: string;
  title: string;
  value: string;
  image?: string;
};

interface CardCollapsibleProps {
  children?: React.ReactNode;
  renderHeader?: React.ReactNode;
}
const CardCollapsible = ({children, renderHeader}: CardCollapsibleProps) => {
  const isShow = useSharedValue(false);
  const handlePress = () => {
    isShow.value = !isShow.value;
  };

  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() => {
    return withSpring(height.value * Number(isShow.value ? 1 : 0), {
      duration: 2000,
      dampingRatio: 0.5,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  });
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));
  const derivedRotate = useDerivedValue(() => {
    return withSpring(180 * Number(isShow.value ? 1 : 0), {
      duration: 2000,
      dampingRatio: 0.5,
      stiffness: 100,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 2,
      reduceMotion: ReduceMotion.System,
    });
  });
  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${derivedRotate.value}deg`}],
  }));

  return (
    <Animated.View>
      <View style={styles.container}>
        <Pressable onPress={handlePress}>
          <Layout.Wrapper flexDirection="row" gap={24}>
            {/* <Text
              size="16"
              weight="semiBold"
              color="ELEMENT_BASE"
              style={styles.flexStyle}>
              {item.title}
            </Text> */}
            {renderHeader}
            <Animated.View style={[styles.rowLayout, rotateStyle]}>
              <SvgIcon name={'caretUp'} size={22} fill={'ELEMENT_ON_LIGHT_2'} />
            </Animated.View>
          </Layout.Wrapper>
        </Pressable>
        <Animated.View style={[bodyStyle, styles.overFlowHidden]}>
          <View
            style={styles.absolute}
            onLayout={e => {
              height.value = e.nativeEvent.layout.height;
            }}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export default CardCollapsible;
const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  overFlowHidden: {
    overflow: 'hidden',
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  rowLayout: {
    justifyContent: 'center',
  },
});
