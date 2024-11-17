import {StyleSheet} from 'react-native';

import {sizeScale} from '@utils/index';

import {TTextSize} from '../Text/type';
import {ChipHeight} from './types';

export const MAPPED_CHIP_ICON_HEIGHT_ICON_SIZE: Record<ChipHeight, number> = {
  18: 14,
  22: 14,
  26: 16,
  34: 18,
};

export const MAPPED_CHIP_ICON_HEIGHT_PADDING_HORIZONTAL: Record<
  ChipHeight,
  number
> = {
  18: 2,
  22: 4,
  26: 8,
  34: 8,
};

export const MAPPED_CHIP_TEXT_HEIGHT_TEXT_SIZE: Record<ChipHeight, TTextSize> =
  {
    18: '11',
    22: '11',
    26: '12',
    34: '12',
  };
export const MAPPED_CHIP_TEXT_HEIGHT_BORDER_RADIUS_SIZE: Record<
  ChipHeight,
  number
> = {
  18: 9,
  22: 11,
  26: 13,
  34: 17,
};

export const MAPPED_CHIP_TEXT_HEIGHT_PADDING_HORIZONTAL: Record<
  ChipHeight,
  number
> = {
  18: 4,
  22: 8,
  26: 8,
  34: 8,
};

export const MAPPED_CHIP_ICON_TEXT_GAP: Record<ChipHeight, number> = {
  18: 2,
  22: 4,
  26: 4,
  34: 4,
};

export const COMMON_STYLES = StyleSheet.create({
  container: {
    borderWidth: sizeScale(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
