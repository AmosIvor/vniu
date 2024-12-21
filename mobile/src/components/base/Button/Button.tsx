import React, {useMemo} from 'react';

import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {COLORS} from '@assets/color';

import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import SvgIcon from '../SvgIcon/SvgIcon';
import {TIconName} from '../SvgIcon/types';
import {buttonStyleSize, iconsSize, labelStyleSize} from './constants';
import {TSize} from './types';

export interface IBaseButton {
  //attribute
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;

  //button
  width?: number;
  size?: TSize;
  containerStyle?: StyleProp<ViewStyle>;
  buttonColor?: keyof typeof COLORS;
  labelColor?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  center?: boolean;

  //label
  label: string;

  //icon
  leftIconName?: TIconName;
  rightIconName?: TIconName;
}

const BaseButton = ({
  onPress,
  disabled,
  isLoading = false,

  width,
  containerStyle,
  buttonColor,
  labelColor = 'ELEMENT_ON_DARK',
  borderColor,
  center = false,

  label = 'button',
  size = '44',

  leftIconName,
  rightIconName,
}: IBaseButton) => {
  const buttonStyle = useMemo(() => {
    return StyleSheet.compose(styles.buttonContainer, {
      ...buttonStyleSize[size],
      backgroundColor: buttonColor ? COLORS[buttonColor] : 'transparent',
      borderWidth: borderColor ? 1 : 0,
      borderColor: borderColor ? COLORS[borderColor] : 'transparent',
      width: width,
      opacity: disabled ? 0.5 : 1,
      alignSelf: center ? 'center' : undefined,
    });
  }, [borderColor, buttonColor, center, disabled, size, width]);
  const labelStyle = useMemo(() => {
    return StyleSheet.compose(labelStyleSize[size], {
      color: COLORS[labelColor],
    });
  }, [labelColor, size]);

  if (isLoading) {
    return (
      <View style={containerStyle}>
        <View style={buttonStyle}>
          <ActivityIndicator color={labelColor} size={iconsSize[size]} />
        </View>
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled}
        onPress={onPress}>
        {leftIconName && (
          <SvgIcon
            name={leftIconName}
            size={iconsSize[size]}
            fill={labelColor}
          />
        )}
        <Text style={labelStyle}>{label}</Text>
        {rightIconName && (
          <SvgIcon
            name={rightIconName}
            size={iconsSize[size]}
            fill={labelColor}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
