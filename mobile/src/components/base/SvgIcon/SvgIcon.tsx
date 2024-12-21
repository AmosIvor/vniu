import {Svg} from 'react-native-svg';

import React, {useMemo} from 'react';

import {sizeScale} from '@utils/dimensions';

import {COLORS} from '@assets/color';

import svgs from '../../../assets/svgs';
import {TIconName} from './types';

interface ISvgIconProps {
  name: TIconName;
  size: number;
  fill?: keyof typeof COLORS;
}
const SvgIcon = ({
  name,
  size = 12,
  fill = 'SEMANTIC_DANGER_1',
}: ISvgIconProps) => {
  const sizeCache = useMemo(() => {
    return sizeScale(size);
  }, [size]);

  const svgCache = useMemo(() => {
    const svg = svgs[name]?.svg;
    if (!svg) {
      return undefined;
    }
    return React.cloneElement(svg, {
      fill: COLORS[fill],
    });
  }, [name, fill]);

  if (!svgCache || !name) {
    return null;
  }
  return (
    <Svg height={sizeCache} width={sizeCache} viewBox={svgs[name]?.viewBox}>
      {svgCache}
    </Svg>
  );
};
export default SvgIcon;
