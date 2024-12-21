import RNLinearGradient from 'react-native-linear-gradient';

import React from 'react';

import {StyleProp, ViewStyle} from 'react-native';

interface ILinearGradientProps {
  colors: (string | number)[];
  start?: {x: number; y: number};
  end?: {x: number; y: number};
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}
const LinearGradient = ({
  colors,
  start,
  end,
  children,
  style,
}: ILinearGradientProps) => {
  return (
    <RNLinearGradient style={style} colors={colors} start={start} end={end}>
      {children}
    </RNLinearGradient>
  );
};
export default LinearGradient;
