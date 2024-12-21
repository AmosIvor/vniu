import {ViewStyle} from 'react-native';

import {COLORS} from '@assets/color';

import {TIconName} from '../SvgIcon/types';
import {TMessageType} from './type';

export const IconMessageTypeHasMap: {[n in TMessageType]: TIconName} = {
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning',
};

export const stylesTypesHashMap: {
  [n in TMessageType]: {
    backgroundColor: ViewStyle['backgroundColor'];
    progressBarColor: ViewStyle['backgroundColor'];
  };
} = {
  success: {
    backgroundColor: COLORS.SEMANTIC_SUCCESS_3,
    progressBarColor: COLORS.ELEMENT_ACCENT,
  },
  info: {
    backgroundColor: COLORS.SEMANTIC_INFO_3,
    progressBarColor: COLORS.SEMANTIC_WARNING_1,
  },
  warning: {
    backgroundColor: COLORS.SEMANTIC_WARNING_3,
    progressBarColor: COLORS.SEMANTIC_WARNING_1,
  },
  error: {
    backgroundColor: COLORS.SEMANTIC_DANGER_3,
    progressBarColor: COLORS.SEMANTIC_DANGER_1,
  },
};
