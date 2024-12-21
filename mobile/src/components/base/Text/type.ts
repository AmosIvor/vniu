import {TextProps, ViewStyle} from 'react-native';

import {COLORS} from '@assets/color';

export type TTextSize =
  | '60'
  | '48'
  | '36'
  | '30'
  | '24'
  | '20'
  | '18'
  | '16'
  | '14'
  | '12'
  | '11';
export type TTextWeight =
  | 'light'
  | 'lightItalic'
  | 'medium'
  | 'mediumItalic'
  | 'semiBold'
  | 'semiBoldItalic';

export type TTextProps = {
  children: React.ReactNode;
  size?: TTextSize;
  weight?: TTextWeight;
  color?: keyof typeof COLORS;
  center?: boolean;
  style?: ViewStyle;
  minLines?: number;
  lineHeightText?: TTextSize;
} & TextProps;
