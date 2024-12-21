import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TabsStackParamList } from './TabsNavigator'
import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  ForgotPasswordScreen: undefined
  SignInScreen: undefined
  SignUpScreen: undefined
  HomeScreen: undefined
  ProductDetailScreen: undefined
  ProductSearchScreen: undefined
  ChatScreen: undefined
  TabsStack: NavigatorScreenParams<TabsStackParamList>
  TabNavigation: NavigatorScreenParams<TabsStackParamList>
  OrderHistory: undefined
}

export type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type ProductSearchScreenProp = NativeStackScreenProps<RootStackParamList, 'ProductSearchScreen'>

export type ProductDetailScreen = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>

export type ChatScreenProp = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>
export type TabNavigation = NativeStackScreenProps<RootStackParamList, 'TabNavigation'>
