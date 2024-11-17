import {useNavigation} from '@react-navigation/native';

export const useAppGetNameScreen = () => {
  const {getState} = useNavigation<any>();
  const state = getState();
  const currentRoute = state.routes[state.index];
  return {nameScreen: getNestedRouteName(currentRoute)};
};

const getNestedRouteName = (route: any): string => {
  if (route.state && route.state.routes) {
    const nestedRoute = route.state.routes[route.state.index];
    return getNestedRouteName(nestedRoute);
  } else {
    return route.name;
  }
};
