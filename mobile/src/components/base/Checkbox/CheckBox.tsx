import React, {useCallback} from 'react';

import {Pressable, StyleSheet} from 'react-native';

import {sizeScale} from '@utils/dimensions';

import SvgIcon from '../SvgIcon/SvgIcon';

export interface ICheckboxProps {
  onPress: (value: boolean) => void;
  value: boolean;
  children?: React.ReactNode;
}
const Checkbox = ({value, onPress, children}: ICheckboxProps) => {
  const _handleOnPress = useCallback(() => {
    if (onPress) {
      onPress(!value);
    }
  }, [onPress, value]);

  return (
    <Pressable onPress={_handleOnPress} style={styles.container}>
      <SvgIcon
        name={value ? 'checkboxTrue' : 'checkboxFalse'}
        fill={value ? 'ELEMENT_BASE' : 'SURFACE_WHITE'}
        size={20}
      />

      {children}
    </Pressable>
  );
};
export default Checkbox;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: sizeScale(12),
    // borderColor: 'white',
    alignItems: 'center',
  },
});
