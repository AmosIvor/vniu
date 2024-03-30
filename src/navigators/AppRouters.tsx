import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from '@screens/chats/ChatScreen'
import ProductSearchScreen from '@screens/products/ProductSearchScreen'
import { RootStackParamList } from 'src/types/screen.type'
const AppRouters = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName='ProductSearchScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductSearchScreen' component={ProductSearchScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      {/* <Stack.Screen name='TabNavigation' component={TabNavigation} /> */}
    </Stack.Navigator>
  )
}
export default AppRouters
