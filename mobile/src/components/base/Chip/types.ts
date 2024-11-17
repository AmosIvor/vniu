import {COLORS} from '@assets/color';

export type ChipHeight = '18' | '22' | '26' | '34';
export type CommonChipProps = {
  height: ChipHeight;
  backgroundColor: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  paddingHorizontal?: number;
  labelColor?: keyof typeof COLORS;
};
