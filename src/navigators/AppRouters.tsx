import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from '@screens/chats/ChatScreen'
import ProductSearchScreen from '@screens/products/ProductSearchScreen'
import { RootStackParamList } from 'src/types/screen.type'
import TabsNavigator from './TabsNavigator'
const AppRouters = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName='TabNavigation' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductSearchScreen' component={ProductSearchScreen} />
      <Stack.Screen name='ChatScreen' component={ChatScreen} />
      <Stack.Screen name='TabNavigation' component={TabsNavigator} />
    </Stack.Navigator>
  )
}
export default AppRouters
