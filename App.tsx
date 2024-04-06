import React, { useState } from 'react'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { RootNavigator } from '@navigators'

const App = () => {
  const deviceColorScheme = useColorScheme()
  const [theme, setTheme] = useState(deviceColorScheme === 'dark' ? 'dark' : 'light')

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          translucent
          barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
        />

        <Host>
          <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
            <BottomSheetModalProvider>
              <RootNavigator toggleTheme={toggleTheme} />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </Host>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App
