import React, {useMemo} from 'react';

import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import SvgIcon from '../SvgIcon/SvgIcon';
import {TIconName} from '../SvgIcon/types';
import Text from '../Text/Text';
import {
  MAPPED_CHIP_ICON_HEIGHT_ICON_SIZE,
  MAPPED_CHIP_ICON_TEXT_GAP,
  MAPPED_CHIP_TEXT_HEIGHT_BORDER_RADIUS_SIZE,
  MAPPED_CHIP_TEXT_HEIGHT_PADDING_HORIZONTAL,
  MAPPED_CHIP_TEXT_HEIGHT_TEXT_SIZE,
} from './constants';
import {ChipHeight} from './types';

export interface IBaseChip {
  height: ChipHeight;
  containerStyle?: StyleProp<ViewStyle>;
  chipColor?: keyof typeof COLORS;
  labelColor?: keyof typeof COLORS;
  label?: string;
  leftIconName?: TIconName;
  rightIconName?: TIconName;
}

const BaseChip = ({
  height,
  containerStyle,
  chipColor,
  labelColor = 'ELEMENT_ON_DARK',
  label,
  leftIconName,
  rightIconName,
}: IBaseChip) => {
  const ChipStyle = useMemo(() => {
    return StyleSheet.compose(
      {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: sizeScale(+height),
        borderRadius: MAPPED_CHIP_TEXT_HEIGHT_BORDER_RADIUS_SIZE[height],
        backgroundColor: chipColor ? COLORS[chipColor] : 'transparent',
        paddingHorizontal: MAPPED_CHIP_TEXT_HEIGHT_PADDING_HORIZONTAL[height],
        gap: sizeScale(MAPPED_CHIP_ICON_TEXT_GAP[height]),
      },
      containerStyle,
    );
  }, [chipColor, containerStyle, height]);

  return (
    <View style={ChipStyle}>
      {leftIconName && (
        <SvgIcon
          name={leftIconName}
          size={MAPPED_CHIP_ICON_HEIGHT_ICON_SIZE[height]}
          fill={labelColor}
        />
      )}
      {label && (
        <Text
          size={MAPPED_CHIP_TEXT_HEIGHT_TEXT_SIZE[height]}
          weight="light"
          color={labelColor}>
          {label}
        </Text>
      )}
      {rightIconName && (
        <SvgIcon
          name={rightIconName}
          size={MAPPED_CHIP_ICON_HEIGHT_ICON_SIZE[height]}
          fill={labelColor}
        />
      )}
    </View>
  );
};

export default BaseChip;
