import React, {useMemo} from 'react';

import {View, ViewStyle} from 'react-native';

import {sizeScale} from '@utils/dimensions';

interface ILayoutWrapperProps {
  children: React.ReactNode;
  gap?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline'
    | undefined;
  flexDirection?:
    | 'row'
    | 'column'
    | 'row-reverse'
    | 'column-reverse'
    | undefined;
  flex?: number;
  isBorderDebug?: boolean;
}
const LayoutWrapper = ({
  children,
  paddingHorizontal,
  paddingVertical,
  gap,
  justifyContent,
  alignItems,
  flexDirection,
  flex,

  isBorderDebug,
}: ILayoutWrapperProps) => {
  const containerStyle: ViewStyle = useMemo(
    () => ({
      paddingHorizontal: paddingHorizontal && sizeScale(paddingHorizontal),
      paddingVertical: paddingVertical && sizeScale(paddingVertical),
      gap: gap ? sizeScale(gap) : undefined,
      flexDirection,
      justifyContent,
      alignItems,
      flex,

      borderWidth: isBorderDebug ? 1 : 0,
    }),
    [
      alignItems,
      flex,
      flexDirection,
      gap,
      isBorderDebug,
      justifyContent,
      paddingHorizontal,
      paddingVertical,
    ],
  );
  return <View style={containerStyle}>{children}</View>;
};
export default LayoutWrapper;

// const styles = StyleSheet.create({
//   container: {},
// });
