import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import SvgIcon from '../SvgIcon/SvgIcon';

interface TaskInterface {
  [key: string]: any;
}

interface CardSwipeToDeleteProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  onDismiss: (task: TaskInterface) => void;
  children: React.ReactNode;
  height?: number;
}

const TRANSLATE_X_THRESHOLD = -50;

const CardSwipeToDelete: React.FC<CardSwipeToDeleteProps> = ({
  task,
  onDismiss,
  children,
  height = sizeScale(52),
}) => {
  const translateX = useSharedValue(0);
  const opacityView = useSharedValue(1);
  const widthIcon = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      widthIcon.value = -event.translationX;
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-50);
        opacityView.value = withTiming(1);
        widthIcon.value = withTiming(50);
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
    height,
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value >= 0 ? 0 : 1);
    const width = widthIcon.value;
    const overflow = 'hidden';
    return {opacity, width, overflow};
  });

  return (
    <GestureHandlerRootView style={styles.taskContainer}>
      <Animated.View style={styles.taskContainer} exiting={FadeOutUp}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => onDismiss(task)}>
            <SvgIcon name="trashSimple" size={20} />
          </TouchableOpacity>
        </Animated.View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.task, rStyle]}>
            {children}
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: sizeScale(4),
    borderRadius: 10,
  },
  task: {
    width: '90%',
    justifyContent: 'center',
    paddingVertical: sizeScale(16),
    paddingHorizontal: sizeScale(12),
    borderWidth: sizeScale(1),
    borderColor: COLORS.BORDER_NEUTRAL,
    borderRadius: sizeScale(12),
    overflow: 'hidden',
  },
  iconContainer: {
    backgroundColor: COLORS.SEMANTIC_DANGER_4,
    position: 'absolute',
    height: '100%',
    right: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardSwipeToDelete;
