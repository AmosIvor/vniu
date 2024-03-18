import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@screens/homes/HomeScreen'
import ProductDetailScreen from '@screens/products/ProductDetailScreen'
import ProductSearchScreen from '@screens/products/ProductSearchScreen'
import { RootStackParamList } from 'src/types/screen.type'
const AppRouters = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductSearchScreen' component={ProductSearchScreen} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='ProductDetailScreen' component={ProductDetailScreen} />
    </Stack.Navigator>
  )
}
export default AppRouters
