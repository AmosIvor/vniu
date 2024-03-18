import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type RootStackParamList = {
  HomeScreen: undefined
  ProductDetailScreen: undefined
  ProductSearchScreen: undefined
}

export type HomeScreenProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type ProductSearchScreenProp = NativeStackScreenProps<RootStackParamList, 'ProductSearchScreen'>

export type ProductDetailScreen = NativeStackScreenProps<RootStackParamList, 'ProductDetailScreen'>
