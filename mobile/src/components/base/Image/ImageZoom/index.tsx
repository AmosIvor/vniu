import {GestureDetector} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import React, {ForwardRefRenderFunction, forwardRef} from 'react';

import {StyleSheet} from 'react-native';

import {useZoomable} from './hooks/useZoomable';
import type {ImageZoomProps, ImageZoomRef} from './types.tsx';

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

const Zoomable: ForwardRefRenderFunction<ImageZoomRef, ImageZoomProps> = (
  {
    uri = '',
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    style = {},
    ...props
  },
  ref,
) => {
  const {animatedStyle, gestures, onZoomableLayout} = useZoomable({
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    ref,
  });

  return (
    <GestureDetector gesture={gestures}>
      <Animated.Image
        style={[styles.image, style, animatedStyle]}
        source={{uri}}
        resizeMode="contain"
        onLayout={onZoomableLayout}
        {...props}
      />
    </GestureDetector>
  );
};

export default forwardRef(Zoomable);
