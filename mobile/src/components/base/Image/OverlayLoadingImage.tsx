import React, {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

export type TOverlayLoadingImage = {
  start: () => void;
  end: () => void;
};

interface IOverlayLoadingImageProps {
  style: StyleProp<ViewStyle>;
}
const OverlayLoadingImage = forwardRef<
  TOverlayLoadingImage,
  PropsWithChildren<IOverlayLoadingImageProps>
>(({style}, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const start = () => {
    setIsLoading(true);
  };
  const end = () => {
    setIsLoading(false);
  };

  useImperativeHandle(ref, () => ({
    start,
    end,
  }));

  if (!isLoading) {
    return null;
  }

  return (
    <View style={[style, styles.container]}>
      <ActivityIndicator color="BORDER_ACCENT" size={20} />
    </View>
  );
});
export default OverlayLoadingImage;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#rgba(0,0,0,0.3)',
  },
});
