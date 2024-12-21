import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue, // withSequence,
  withTiming,
} from 'react-native-reanimated';

import React, {useEffect, useMemo, useRef} from 'react';

import {StyleSheet, View} from 'react-native';

import {SCREEN_WIDTH, sizeScale} from '@utils/dimensions';

import {Layout} from '../../base';
import SvgIcon from '../SvgIcon/SvgIcon';
import Text from '../Text/Text';
import {IconMessageTypeHasMap, stylesTypesHashMap} from './constants';
import {TMessageType} from './type';

interface IToastMessage {
  content: string | undefined;
  type: TMessageType;
  isVisible: boolean;
  hide: () => void;
}

interface IProgressBar {
  duration: number;
  type: TMessageType;
  parentWidth: number;
  isDifferentToast: boolean;
  hide: () => void;
}

const ProgressBar = ({duration, type, parentWidth, hide}: IProgressBar) => {
  const progressAni = useSharedValue<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: progressAni.value,
      backgroundColor: stylesTypesHashMap[type].progressBarColor,
    };
  });

  useEffect(() => {
    progressAni.value = withTiming(
      parentWidth,
      {duration: duration},
      isFinished => {
        if (isFinished) {
          runOnJS(hide)();
        }
      },
    );
  }, [duration, progressAni, parentWidth, hide]);

  return (
    <Animated.View style={styles.progressBarWrapper}>
      <Animated.View style={[styles.bar, animatedStyle]} />
    </Animated.View>
  );
};

const ToastMessage = ({
  content = 'no message',
  type,
  isVisible,
  hide,
}: IToastMessage) => {
  const COMPONENT_WIDTH = SCREEN_WIDTH;

  const containerContentStyle = useMemo(() => {
    return StyleSheet.compose(styles.containerContent, {
      backgroundColor: stylesTypesHashMap[type].backgroundColor,
      width: COMPONENT_WIDTH,
    });
  }, [COMPONENT_WIDTH, type]);

  const componentId = `${content}+${type}`;
  const componentIdRef = useRef(componentId);
  const isDifferentToast = componentId !== componentIdRef.current;

  componentIdRef.current = componentId;

  const positionAni = useSharedValue(0);

  const toastRootStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: positionAni.value}],
    };
  });

  // if (isDifferentToast && isVisible) {
  //   positionAni.value = withSequence(
  //     withTiming(-200, {
  //       duration: 150,
  //     }),
  //     withTiming(0),
  //   );
  // }

  return (
    <Animated.View style={[containerContentStyle, toastRootStyle]}>
      <Layout.Wrapper flexDirection="row" alignItems="flex-start" gap={8}>
        <SvgIcon name={IconMessageTypeHasMap[type]} size={18} />

        <Layout.Wrapper flex={1}>
          <Text weight="medium" size="14" color="ELEMENT_ON_LIGHT">
            {content}
          </Text>
        </Layout.Wrapper>
      </Layout.Wrapper>
      {isVisible && (
        <View style={styles.progressBarWrapper}>
          <ProgressBar
            duration={4000}
            type={type}
            parentWidth={COMPONENT_WIDTH}
            isDifferentToast={isDifferentToast}
            hide={hide}
          />
        </View>
      )}
    </Animated.View>
  );
};

export default ToastMessage;

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: sizeScale(20),
    paddingVertical: sizeScale(16),
    gap: sizeScale(8),
  },
  progressBarWrapper: {
    position: 'absolute',
    bottom: 0,
  },
  bar: {
    height: sizeScale(5),
  },
});
