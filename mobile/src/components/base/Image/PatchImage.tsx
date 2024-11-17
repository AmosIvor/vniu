import {ImageStyle, ResizeMode} from 'react-native-fast-image';

import React from 'react';

import {StyleProp, ViewStyle} from 'react-native';

import ImageBase from './ImageBase';

interface IPatchImageProps {
  patch: string;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle | ViewStyle>;
}

const PatchImage = ({patch, resizeMode = 'cover', style}: IPatchImageProps) => {
  const uri = patch;

  if (!patch) {
    return null;
  }

  return (
    <ImageBase
      pointerEvents="none"
      style={style as ImageStyle}
      source={{uri}}
      resizeMode={resizeMode}
    />
  );
};

export default PatchImage;
