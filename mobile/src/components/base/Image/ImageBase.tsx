import FastImage, {FastImageProps} from 'react-native-fast-image';

import React, {useCallback, useRef} from 'react';

import {View} from 'react-native';

import OverlayLoadingImage, {TOverlayLoadingImage} from './OverlayLoadingImage';

const ImageBase = (props: FastImageProps) => {
  const loadingRef = useRef<TOverlayLoadingImage>(null);

  const _handleEndLoading = useCallback(() => {
    loadingRef.current?.end();
  }, []);

  return (
    <View>
      <FastImage onLoadEnd={_handleEndLoading} {...props} />
      <OverlayLoadingImage ref={loadingRef} style={props.style} />
    </View>
  );
};
export default ImageBase;
