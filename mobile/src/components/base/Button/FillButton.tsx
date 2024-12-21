import React from 'react';

import {COLORS} from '@assets/color';

import Button, {IBaseButton} from './Button';

type TFillButtonProps = {
  buttonColor?: keyof typeof COLORS;
  labelColor?: keyof typeof COLORS;
} & Omit<IBaseButton, 'borderColor'>;
const FillButton = ({
  buttonColor = 'SURFACE_ACCENT',
  labelColor = 'ELEMENT_ON_DARK',
  ...props
}: TFillButtonProps) => {
  return (
    <Button buttonColor={buttonColor} labelColor={labelColor} {...props} />
  );
};
export default FillButton;
