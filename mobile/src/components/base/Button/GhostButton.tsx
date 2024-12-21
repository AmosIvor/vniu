import React from 'react';

import {COLORS} from '@assets/color';

import Button, {IBaseButton} from './Button';

type TGhostButtonProps = {
  labelColor?: keyof typeof COLORS;
} & IBaseButton;
const GhostButton = ({
  labelColor = 'ELEMENT_ACCENT',
  ...props
}: TGhostButtonProps) => {
  return <Button labelColor={labelColor} {...props} />;
};
export default GhostButton;
