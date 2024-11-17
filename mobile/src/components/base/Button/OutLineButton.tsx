import React from 'react';

import {COLORS} from '@assets/color';

import Button, {IBaseButton} from './Button';

type TOutLineButtonProps = {
  labelColor?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
} & IBaseButton;
const OutLineButton = ({
  labelColor = 'ELEMENT_BASE',
  borderColor = 'BORDER_NEUTRAL',
  ...props
}: TOutLineButtonProps) => {
  return (
    <Button labelColor={labelColor} borderColor={borderColor} {...props} />
  );
};
export default OutLineButton;
