import {useFocusEffect} from '@react-navigation/native';

import {BackHandler} from 'react-native';

// This hook is used to detect the back button press on Android devices
export const useAppDetectBackHandlerAction = ({
  action,
}: {
  action: () => void;
}) => {
  useFocusEffect(() => {
    const onBackPress = () => {
      action?.();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  });
};
