import React from 'react';

import {COLORS} from '@assets/color';

import Chip, {IBaseChip} from './Chip';

type TFillChipProps = {
  ChipColor?: keyof typeof COLORS;
  labelColor?: keyof typeof COLORS;
} & Omit<IBaseChip, 'borderColor'>;
const FillChip = ({
  chipColor = 'SURFACE_ACCENT',
  labelColor = 'ELEMENT_ON_DARK',
  ...props
}: TFillChipProps) => {
  return <Chip chipColor={chipColor} labelColor={labelColor} {...props} />;
};
export default FillChip;
