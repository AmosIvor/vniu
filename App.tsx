import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AppRouters } from '@navigators'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
const App = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
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
    </SafeAreaProvider>
  )
}
export default App
