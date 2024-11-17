import React from 'react';

import {StyleSheet, View} from 'react-native';

import {SvgIcon, TIconName, Text} from '@components/base';
import {TTextProps, TTextSize, TTextWeight} from '@components/base/Text/type';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import {ICON_SIZE_HASH_MAP} from './constants';

type TTextWithIconProps = {
  unit?: string;
  iconName: TIconName;
  iconColor?: keyof typeof COLORS;
  color?: keyof typeof COLORS;
  children: React.ReactNode;
  textSize?: TTextSize;
  weight?: TTextWeight;
  isIconAlignStart?: boolean;
} & TTextProps;
const TextWithIcon = ({
  iconName = 'mapPinLine',
  iconColor = 'ELEMENT_ON_LIGHT_2',
  color = 'ELEMENT_BASE',
  children,
  textSize,
  weight = 'light',
  isIconAlignStart = false,
  ...props
}: TTextWithIconProps) => {
  const iconSize = textSize ? ICON_SIZE_HASH_MAP[textSize] : 14;
  const centerStyle = !isIconAlignStart
    ? styles.alignSelf
    : {paddingTop: sizeScale(2)};
  return (
    <View style={styles.container}>
      <View style={[{}, centerStyle]}>
        <SvgIcon name={iconName} size={iconSize} fill={color || iconColor} />
      </View>
      <Text size={textSize} weight={weight} color={color} {...props}>
        {children}
      </Text>
    </View>
  );
};
export default TextWithIcon;
const styles = StyleSheet.create({
  alignSelf: {
    alignSelf: 'center',
  },
  container: {
    gap: sizeScale(4),
    flexDirection: 'row',
  },
});
