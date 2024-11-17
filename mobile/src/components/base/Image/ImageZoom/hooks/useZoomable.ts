import {useGestures} from '../hooks/useGestures';
import {useZoomableHandle} from '../hooks/useZoomableHandle';
import {useZoomableLayout} from '../hooks/useZoomableLayout';
import type {UseZoomableProps} from '../types.tsx';

export const useZoomable = ({
  minScale,
  maxScale,
  doubleTapScale,
  minPanPointers,
  maxPanPointers,
  isSingleTapEnabled,
  isDoubleTapEnabled,
  onProgrammaticZoom,
  onResetAnimationEnd,
  onLayout,
  ref,
}: UseZoomableProps) => {
  const {width, height, center, onZoomableLayout} = useZoomableLayout({
    onLayout,
  });
  const {animatedStyle, gestures, reset, zoom} = useGestures({
    width,
    height,
    center,
    minScale,
    maxScale,
    doubleTapScale,
    minPanPointers,
    maxPanPointers,
    isSingleTapEnabled,
    isDoubleTapEnabled,
    onProgrammaticZoom,
    onResetAnimationEnd,
  });
  useZoomableHandle(ref, reset, zoom);

  return {animatedStyle, gestures, onZoomableLayout};
};
