import {ImageStyle, ResizeMode} from 'react-native-fast-image';

import React from 'react';

import {StyleProp, ViewStyle} from 'react-native';

import {IMAGES} from '@assets/images';

import ImageBase from './ImageBase';

interface ILocalImageProps {
  source: keyof typeof IMAGES;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle | ViewStyle>;
}

const LocalImage = ({
  source = 'logo',
  resizeMode = 'cover',

  style,
}: ILocalImageProps) => {
  if (!IMAGES[source]) {
    return null;
  }

  return (
    <ImageBase
      pointerEvents="none"
      style={style as ImageStyle}
      source={IMAGES[source]}
      resizeMode={resizeMode}
    />
  );
};

export default LocalImage;
