import React, { useContext, useState } from 'react'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { RootNavigator } from '@navigators'
import { appThemes } from '@constants'
import { AppContext } from '@contexts'

const App = () => {
  const deviceColorScheme = useColorScheme()
  // const [theme, setTheme] = useState(deviceColorScheme === 'dark' ? 'dark' : 'light')

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  // }

  const { themeTest, setThemeTest } = useContext(AppContext)
  const toggleTheme = () => {
    setThemeTest((prevTheme) => (prevTheme === appThemes.light ? appThemes.dark : appThemes.light))
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          translucent
          barStyle={themeTest === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor='transparent'
        />

        <Host>
          <NavigationContainer theme={themeTest === 'dark' ? DarkTheme : DefaultTheme}>
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
