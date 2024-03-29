import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AppRouters } from '@navigators'
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
          <BottomSheetModalProvider>
            <AppRouters />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </Host>
    </GestureHandlerRootView>
  )
}
export default App
