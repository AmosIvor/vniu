import useAppBottomSheet from './useAppBottomSheet';
import useAppCountdown from './useAppCountdown';
import useAppDebounceActionWithCondition from './useAppDebounceActionWithCondition';
import {useAppDetectBackHandlerAction} from './useAppDetectBackHandlerAction';
import {useAppGetNameScreen} from './useAppGetNameScreen';
import {useAppNavigation} from './useAppNavigation';
import * as useAppQuery from './useAppQuery';
import {useAppResetDefaultRouter} from './useAppResetDefaultRouter';
import {useAppToastMessage} from './useAppToastMessage';

export const UseApps = {
  useAppCountdown,
  useAppNavigation,
  useAppQuery,
  useAppToastMessage,
  useAppDebounceActionWithCondition,
  useAppBottomSheet,
  useAppGetNameScreen,
  useAppResetDefaultRouter,
  useAppDetectBackHandlerAction,
};
