import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import SvgIcon from '../SvgIcon/SvgIcon';
import {TIconName} from '../SvgIcon/types';
import Text from '../Text/Text';

interface ISocialButtonProps {
  label: string;
  name?: TIconName;
  onPress?: () => void;
}
const SocialButton = ({
  label,
  name = 'googleLogo',
  onPress,
}: ISocialButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <SvgIcon name={name} size={16} fill="ELEMENT_BASE" />
      </View>
      <View style={styles.labelWrapper}>
        <Text size="16" weight="medium" color="ELEMENT_BASE" center>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default SocialButton;
const styles = StyleSheet.create({
  labelWrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    height: sizeScale(44),
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: sizeScale(12),
    borderColor: COLORS.BORDER_NEUTRAL,
  },
  iconWrapper: {
    position: 'absolute',
    left: sizeScale(24),
  },
});
