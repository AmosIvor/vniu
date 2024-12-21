import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import ChatScreen from '@screens/chats/ChatScreen'
import ProductSearchScreen from '@screens/products/ProductSearchScreen'
import { RootStackParamList } from 'src/navigators/screen.type'
import TabsNavigator from './TabsNavigator'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
export const AppRouters = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName='TabNavigation' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductSearchScreen' component={ProductSearchScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='TabNavigation' component={TabsNavigator} />
    </Stack.Navigator>
  )
}
export const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>()
}

export const useAppRoute = <RouteName extends keyof RootStackParamList>(name: RouteName) => {
  return useRoute<RouteProp<RootStackParamList, typeof name>>()
}
