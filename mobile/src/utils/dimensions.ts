import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// based on iphone 11
const widthBaseScale = SCREEN_WIDTH / 360;
const heightBaseScale = SCREEN_HEIGHT / 896;

type TBased = 'width' | 'height';

const normalize = (() => {
  // store cached to closure
  const cached: Record<`${TBased}-${number}`, number> = {};

  return (size: number, based: TBased = 'width') => {
    //If cached hit, return normalized size
    if (cached[`${based}-${size}`]) {
      return cached[`${based}-${size}`];
    }
    //else calculate and cache
    const newSize =
      based === 'height' ? size * heightBaseScale : size * widthBaseScale;
    const roundSize = Math.round(PixelRatio.roundToNearestPixel(newSize));
    cached[`${based}-${size}`] = roundSize;
    return roundSize;
  };
})();

//for width  pixel
// export const sizeScale = (size: number) => {
//   return normalize(size, 'width');
// };
//for height  pixel
// export const sizeScale = (size: number) => {
//   return normalize(size, 'height');
// };
//for font  pixel
export const fontPixel = (size: number) => {
  return normalize(size, 'width');
};
//for Margin and Padding vertical pixel
// export const VerticalScale = (size: number) => {
//   return sizeScale(size);
// };
//for Margin and Padding horizontal pixel
// export const HorizontalScale = (size: number) => {
//   return sizeScale(size);
// };

//for size  pixel
export const sizeScale = (size: number) => {
  return normalize(size, 'width');
};
export const dimensions = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
