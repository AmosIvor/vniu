import AppRouters from '@navigators/AppRouters'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
const App = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
        <NavigationContainer>
          <BottomSheetModalProvider>
            <AppRouters />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
export default App
