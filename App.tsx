import AppRouters from '@navigators/AppRouters'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, StatusBar } from 'react-native'
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>
    </SafeAreaView>
  )
}
export default App
