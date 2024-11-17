import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import React, {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import {SCREEN_HEIGHT, sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

const GAP = sizeScale(8);
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.2)';

interface IDropdownProps {
  children: React.ReactNode;
  renderContent: () => JSX.Element;
  widthContent: number;
  heightContent: number;
  isRight?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
type TMeasure = {
  x?: number;
  y?: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

export type THandleDropdown = {
  handleCloseDropdown: () => void;
  handleOpenDropdown: () => void;
};

const Dropdown = forwardRef<THandleDropdown, PropsWithChildren<IDropdownProps>>(
  (
    {
      children,
      renderContent,
      heightContent,
      isRight,
      widthContent,
      contentContainerStyle,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [measure, setMeasure] = useState<TMeasure>({
      pageY: 0,
      height: 0,
      pageX: 0,
      width: 0,
    });

    const childrenViewRef = useRef<View>(null);
    const hightAni = useSharedValue(0);
    const opacityAni = useSharedValue(0);

    const aniStyle = useAnimatedStyle(
      () => ({height: hightAni.value, opacity: opacityAni.value}),
      [],
    );

    const getMeasure = useCallback((func?: () => void) => {
      childrenViewRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setMeasure({x, y, width, height, pageX, pageY});
        func?.();
      });
    }, []);

    const _handleToggleModal = useCallback(() => {
      setVisible(prevVisible => !prevVisible);
    }, []);

    const _handleOpenDropdown = useCallback(() => {
      getMeasure(_handleToggleModal);
    }, [_handleToggleModal, getMeasure]);

    const _handleCloseDropdown = useCallback(() => {
      opacityAni.value = withTiming(0);
      hightAni.value = withTiming(0, {}, () => {
        runOnJS(_handleToggleModal)();
      });
    }, [_handleToggleModal, hightAni, opacityAni]);

    const dropdownContainerStyle = useMemo(() => {
      const {pageY, pageX, width: msWidth, height: msHeight} = measure;
      const heightCheck =
        SCREEN_HEIGHT - pageY >= sizeScale(heightContent) + GAP;
      const top = heightCheck
        ? pageY + msHeight + GAP
        : SCREEN_HEIGHT - sizeScale(heightContent);
      const left = isRight ? pageX + msWidth - sizeScale(widthContent) : pageX;

      return StyleSheet.compose(
        {
          left,
          top: top,
          width: sizeScale(widthContent),
          overflow: 'hidden',
          position: 'absolute',
          backgroundColor: COLORS.BORDER_ACCENT_3,
          borderWidth: 1,
          borderColor: COLORS.BORDER_ACCENT_3,
          borderRadius: sizeScale(10),
          justifyContent: 'center',
          alignItems: 'center',
        },
        contentContainerStyle,
      );
    }, [contentContainerStyle, heightContent, isRight, measure, widthContent]);

    useEffect(() => {
      if (visible) {
        hightAni.value = withTiming(sizeScale(heightContent));
        opacityAni.value = withTiming(1);
      }
    }, [heightContent, hightAni, opacityAni, visible]);

    useImperativeHandle(ref, () => ({
      handleCloseDropdown: _handleCloseDropdown,
      handleOpenDropdown: _handleOpenDropdown,
    }));

    return (
      <>
        <TouchableOpacity onPress={_handleOpenDropdown}>
          <View ref={childrenViewRef} collapsable={false}>
            {children}
          </View>
        </TouchableOpacity>
        <Modal visible={visible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={_handleCloseDropdown}>
            <View style={styles.modalContainer}>
              <Animated.View style={[dropdownContainerStyle, aniStyle]}>
                {renderContent?.() || null}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  },
);
export default Dropdown;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});
