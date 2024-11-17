import React, {useMemo} from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';

import {COLORS} from '@assets/color';

import SvgIcon from '../SvgIcon/SvgIcon';
import {TIconName} from '../SvgIcon/types';
import {iconButtonSize, iconButtonStyleSize} from './constants';
import {TIconButtonSize} from './types';

interface IIconButtonProps {
  iconColor?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  backgroundColor?: keyof typeof COLORS;
  name: TIconName;
  disabled?: boolean;
  size: TIconButtonSize;
  onPress?: () => void;
}
const IconButton = ({
  iconColor = 'ELEMENT_BASE',
  backgroundColor,
  borderColor = 'BORDER_NEUTRAL',
  name = 'camera',
  size = '36',
  disabled,
  onPress,
}: IIconButtonProps) => {
  const buttonContainerStyle = useMemo(() => {
    return StyleSheet.compose(iconButtonStyleSize[size], {
      backgroundColor: backgroundColor ? COLORS[backgroundColor] : undefined,
      borderColor: COLORS[borderColor],
      borderWidth: 1,
    });
  }, [backgroundColor, borderColor, size]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={buttonContainerStyle}>
      <SvgIcon
        name={name}
        size={iconButtonSize[size]}
        fill={disabled ? 'BORDER_NEUTRAL_2' : iconColor}
      />
    </TouchableOpacity>
  );
};
export default IconButton;
