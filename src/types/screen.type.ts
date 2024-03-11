import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  HomeScreen: undefined
  ProductDetailScreen: undefined
}

export type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type ProductDetailScreen = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>
