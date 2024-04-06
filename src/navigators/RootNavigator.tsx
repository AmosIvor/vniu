import React from 'react'
import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigation, { TabsStackParamList } from './TabsNavigator'
import ProductSearchScreen from '@screens/products/ProductSearchScreen'
import ChatScreen from '@screens/chats/ChatScreen'
import SignInScreen from '@screens/auths/SignInScreen'
import SignUpScreen from '@screens/auths/SignUpScreen'
import ProductDetailScreen from '@screens/products/ProductDetailScreen'

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>
  Details: {
    id: string
  }
  ForgotPasswordScreen: undefined
  SignInScreen: undefined
  SignUpScreen: undefined
  HomeScreen: undefined
  ProductDetailScreen: undefined
  ProductSearchScreen: undefined
  ChatScreen: undefined
}

const RootStack = createNativeStackNavigator<RootStackParamList>()

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

const RootNavigator = ({ toggleTheme }: any) => {
  return (
    <RootStack.Navigator initialRouteName='TabsStack' screenOptions={{ headerShown: false }}>
      <RootStack.Screen name='TabsStack'>
        {(props) => <TabNavigation {...props} toggleTheme={toggleTheme} />}
      </RootStack.Screen>
      <RootStack.Screen name='Details' component={ProductDetailScreen} />
      <RootStack.Screen name='SignInScreen' component={SignInScreen} />
      <RootStack.Screen name='SignUpScreen' component={SignUpScreen} />
      <RootStack.Screen name='ProductSearchScreen' component={ProductSearchScreen} />
      <RootStack.Screen name='ChatScreen' component={ChatScreen} />
    </RootStack.Navigator>
  )
}

export default RootNavigator
