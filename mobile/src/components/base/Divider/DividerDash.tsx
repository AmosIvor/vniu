import React, {memo, useMemo, useState} from 'react';

import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

import {COLORS} from '@assets/color';

interface IDashedLineProps {
  horizontal?: boolean;
  dashGap?: number;
  dashLength?: number;
  dashThickness?: number;
  dashColor?: keyof typeof COLORS;
  dashStyle?: StyleProp<ViewProps>;
  style?: StyleProp<ViewStyle>;
}

const DashedDash = ({
  horizontal = true,
  dashGap = 2,
  dashLength = 4,
  dashThickness = 2,
  dashColor = 'SEMANTIC_DANGER_2',
  dashStyle,
  style,
}: IDashedLineProps) => {
  const [lineLength, setLineLength] = useState(0);

  const numOfDashes = Math.ceil(lineLength / (dashGap + dashLength));

  const containerStyle = useMemo(() => {
    return StyleSheet.compose(horizontal ? styles.row : styles.column, style);
  }, [horizontal, style]);

  const dashContainerStyle = useMemo(() => {
    return StyleSheet.compose(
      {
        width: horizontal ? dashLength : dashThickness,
        height: horizontal ? dashThickness : dashLength,
        marginRight: horizontal ? dashGap : 0,
        marginBottom: horizontal ? 0 : dashGap,
        backgroundColor: COLORS[dashColor],
      },
      dashStyle,
    );
  }, [dashColor, dashGap, dashLength, dashStyle, dashThickness, horizontal]);

  return (
    <View
      onLayout={event => {
        const {width, height} = event.nativeEvent.layout;
        setLineLength(horizontal ? width : height);
      }}
      style={containerStyle}>
      {[...Array(numOfDashes)].map((_, i) => {
        return <View key={i} style={dashContainerStyle} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    // flex: 1,
    // borderWidth: 1,
  },
});

export default memo(DashedDash);
