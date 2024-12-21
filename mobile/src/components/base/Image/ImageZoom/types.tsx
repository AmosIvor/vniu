import type {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
  PinchGestureHandlerEventPayload,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {AnimatableValue} from 'react-native-reanimated';

import {ForwardedRef} from 'react';

import type {
  ImageProps,
  ImageSourcePropType,
  LayoutChangeEvent,
  LayoutRectangle,
  ViewProps,
} from 'react-native';

export type OnPinchStartCallback = (
  event: GestureStateChangeEvent<PinchGestureHandlerEventPayload>,
) => void;

export type OnPinchEndCallback = (
  event: GestureStateChangeEvent<PinchGestureHandlerEventPayload>,
  success: boolean,
) => void;

export type OnPanStartCallback = (
  event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
) => void;

export type OnPanEndCallback = (
  event: GestureStateChangeEvent<PanGestureHandlerEventPayload>,
  success: boolean,
) => void;

export type OnSingleTapCallback = (
  event: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
) => void;
export enum ZOOM_TYPE {
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
}

export type ProgrammaticZoomCallback = (event: {
  scale: number;
  x: number;
  y: number;
}) => void;

export type OnDoubleTapCallback = (zoomType: ZOOM_TYPE) => void;
export type OnProgrammaticZoomCallback = (zoomType: ZOOM_TYPE) => void;

export enum ANIMATION_VALUE {
  SCALE = 'SCALE',
  FOCAL_X = 'FOCAL_X',
  FOCAL_Y = 'FOCAL_Y',
  TRANSLATE_X = 'TRANSLATE_X',
  TRANSLATE_Y = 'TRANSLATE_Y',
}

export type OnResetAnimationEndCallback = (
  finished?: boolean,
  values?: Record<
    ANIMATION_VALUE,
    {
      finished?: boolean;
      current?: AnimatableValue;
    }
  >,
) => void;

export type ZoomProps = {
  minScale?: number;
  maxScale?: number;
  doubleTapScale?: number;
  minPanPointers?: number;
  maxPanPointers?: number;
  isSingleTapEnabled?: boolean;
  isDoubleTapEnabled?: boolean;

  onResetAnimationEnd?: OnResetAnimationEndCallback;
  onProgrammaticZoom?: OnProgrammaticZoomCallback;
};

export type ZoomableProps = ViewProps & ZoomProps;

export type UseZoomableProps = ZoomProps & {
  ref: ForwardedRef<ZoomableRef>;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
};

export type ImageZoomProps = Omit<ImageProps, 'source'> &
  ZoomProps & {
    uri?: string;
    source?: ImageSourcePropType;
  };

export type ZoomableUseLayoutProps = Pick<ZoomableProps, 'onLayout'>;

export type ZoomableLayoutState = LayoutRectangle & {
  center: {
    x: number;
    y: number;
  };
};

export type ZoomableUseGesturesProps = Pick<
  ZoomableLayoutState,
  'width' | 'height' | 'center'
> &
  Pick<
    ZoomableProps,
    | 'minScale'
    | 'maxScale'
    | 'doubleTapScale'
    | 'minPanPointers'
    | 'maxPanPointers'
    | 'isSingleTapEnabled'
    | 'isDoubleTapEnabled'
    | 'onProgrammaticZoom'
    | 'onResetAnimationEnd'
  >;

export type ZoomableRef = {
  reset: () => void;
  zoom: ProgrammaticZoomCallback;
};

export type ImageZoomRef = ZoomableRef;
