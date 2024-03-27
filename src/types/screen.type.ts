import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  ForgotPasswordScreen: undefined
  SignInScreen: undefined
  SignUpScreen: undefined
  HomeScreen: undefined
  ProductDetailScreen: undefined
  ProductSearchScreen: undefined
  ChatScreen: undefined

  TabNavigation: undefined
}

export type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type ProductSearchScreenProp = NativeStackScreenProps<RootStackParamList, 'ProductSearchScreen'>

export type ProductDetailScreen = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>

export type ChatScreenProp = NativeStackScreenProps<RootStackParamList, 'ChatScreen'>
export type TabNavigation = NativeStackScreenProps<RootStackParamList, 'TabNavigation'>
