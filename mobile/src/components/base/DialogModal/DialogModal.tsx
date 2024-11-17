import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import React, {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import {Modal as RNModal, StyleSheet, View} from 'react-native';

import {SCREEN_WIDTH, sizeScale} from '@utils/dimensions';

import {TDialogModalRef} from './types';

export interface IModal {
  children?: React.ReactNode;
  onAccept?: () => void;
  onCancel?: () => void;
}

const DialogModal = forwardRef<TDialogModalRef, PropsWithChildren<IModal>>(
  ({children, onCancel, onAccept}, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const progress = useSharedValue(0);

    //actions

    const _handleShowModal = useCallback(() => {
      setIsVisible(true);
    }, []);
    const _handleHideModal = useCallback(() => {
      setIsVisible(false);
    }, []);
    // handle animation
    const aniChildren = useAnimatedStyle(() => {
      const scale = interpolate(progress.value, [0, 1], [0.7, 1]);
      const opacity = interpolate(progress.value, [0, 1], [0, 1]);
      return {
        transform: [{scale}],
        opacity,
      };
    });
    const _handleShowModalWithAnimation = useCallback(() => {
      _handleShowModal();
      progress.value = withTiming(1);
    }, [_handleShowModal, progress]);

    // handle ref actions

    const _handleHideModalWithAnimation = useCallback(
      (callback?: () => void) => {
        if (isVisible) {
          progress.value = withTiming(0, {}, isFinished => {
            if (isFinished) {
              runOnJS(_handleHideModal)();
              if (callback) {
                runOnJS(callback)();
              }
            }
          });
        }
      },
      [_handleHideModal, isVisible, progress],
    );

    useImperativeHandle(ref, () => ({
      show: _handleShowModalWithAnimation,
      hide: _handleHideModalWithAnimation,
      cancel: () => _handleHideModalWithAnimation(onCancel),
      accept: () => _handleHideModalWithAnimation(onAccept),
    }));

    return (
      <RNModal visible={isVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Animated.View style={aniChildren}>
            <View style={styles.childrenContainer}>{children}</View>
          </Animated.View>
        </View>
      </RNModal>
    );
  },
);

export default DialogModal;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  childrenContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - sizeScale(32),
    borderRadius: sizeScale(8),
  },
});
