import React from 'react';

import {COLORS} from '@assets/color';

import Chip, {IBaseChip} from './Chip';

type TGhostChipProps = {
  labelColor?: keyof typeof COLORS;
} & IBaseChip;
const GhostChip = ({
  labelColor = 'ELEMENT_ACCENT',
  ...props
}: TGhostChipProps) => {
  return <Chip labelColor={labelColor} {...props} />;
};
export default GhostChip;
