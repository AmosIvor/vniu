import {ImageStyle, ResizeMode} from 'react-native-fast-image';

import React from 'react';

import {StyleProp, ViewStyle} from 'react-native';

import ImageBase from './ImageBase';

interface ICDNImageProps {
  uri: string | undefined;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle | ViewStyle>;
}

const CDNImage = ({uri, resizeMode = 'cover', style}: ICDNImageProps) => {
  return (
    <ImageBase
      pointerEvents="none"
      style={style as ImageStyle}
      source={{uri}}
      resizeMode={resizeMode}
    />
  );
};

export default CDNImage;
