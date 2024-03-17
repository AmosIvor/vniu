import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  ForgotPasswordScreen: undefined
  SignInScreen: undefined
  SignUpScreen: undefined
  HomeScreen: undefined
  ProductDetailScreen: undefined

  TabNavigation: undefined
}

export type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type ProductDetailScreen = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>
