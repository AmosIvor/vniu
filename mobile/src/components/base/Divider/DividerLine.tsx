import React, {useMemo} from 'react';

import {StyleProp, StyleSheet, View, ViewProps} from 'react-native';

import {COLORS} from '@assets/color';

interface IDividerLineProps {
  horizontal?: boolean;
  color?: keyof typeof COLORS;
  dashStyle?: StyleProp<ViewProps>;
  size?: number;
  testID?: string;
}

const DividerLine = ({
  horizontal,
  color = 'ELEMENT_BASE',
  size = 1,
}: IDividerLineProps) => {
  const lineStyle = useMemo(() => {
    return StyleSheet.compose(styles.line, {
      // borderWidth: (size || 1) / (isIosPlatform ? 1 : 2),
      height: horizontal ? 'auto' : size,
      width: horizontal ? size : 'auto',
      backgroundColor: COLORS[color],
    });
  }, [color, horizontal, size]);

  return <View style={lineStyle} />;
};

const styles = StyleSheet.create({
  line: {
    borderBottomColor: COLORS.SURFACE_TINT_3,
  },
});

export default DividerLine;
