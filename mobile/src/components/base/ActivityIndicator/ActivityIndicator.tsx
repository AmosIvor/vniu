import React from 'react';

import {ActivityIndicator as RNActivityIndicator} from 'react-native';

import {COLORS} from '@assets/color';

interface IActivityIndicatorProps {
  color: keyof typeof COLORS;
  size: number;
}
const ActivityIndicator = ({
  size,
  color = 'ELEMENT_BASE_2',
}: IActivityIndicatorProps) => {
  return <RNActivityIndicator color={COLORS[color]} size={size} />;
};
export default ActivityIndicator;
