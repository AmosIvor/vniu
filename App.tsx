import AppRouters from '@navigators/AppRouters'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />

      <Host>
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Host>
    </GestureHandlerRootView>
  )
}
export default App
