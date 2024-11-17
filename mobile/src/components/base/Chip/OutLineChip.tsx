import React from 'react';

import {ViewStyle} from 'react-native';

import {COLORS} from '@assets/color';

import Chip, {IBaseChip} from './Chip';

type TOutLineChipProps = {
  labelColor?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  borderWidth?: number;
} & IBaseChip;
const OutLineChip = ({
  labelColor = 'ELEMENT_BASE',
  borderColor = 'BORDER_NEUTRAL',
  borderWidth = 1,
  ...props
}: TOutLineChipProps) => {
  const style: ViewStyle = {
    borderWidth: borderWidth,
    borderColor: COLORS[borderColor],
  };
  return <Chip labelColor={labelColor} containerStyle={style} {...props} />;
};
export default OutLineChip;
