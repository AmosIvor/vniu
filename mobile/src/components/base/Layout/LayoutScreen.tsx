import React from 'react';

import {StyleSheet, View} from 'react-native';

import {COLORS} from '@assets/color';

interface ILayoutScreenProps {
  children: React.ReactNode;
  isShowHeader?: boolean;
}
const LayoutScreen = ({children}: ILayoutScreenProps) => {
  return <View style={styles.container}>{children}</View>;
};
export default LayoutScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SURFACE_OFF_WHITE,
    flex: 1,
  },
});
