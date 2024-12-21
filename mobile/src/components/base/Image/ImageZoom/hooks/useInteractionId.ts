import {useSharedValue} from 'react-native-reanimated';

import {useCallback} from 'react';

export const useInteractionId = () => {
  const interactionId = useSharedValue('');

  const getInteractionId = useCallback(() => {
    'worklet';
    return interactionId.value;
  }, [interactionId]);

  const updateInteractionId = useCallback(() => {
    interactionId.value = `${new Date().valueOf()}`;
  }, [interactionId]);

  return {getInteractionId, updateInteractionId};
};
