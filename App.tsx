import AppRouters from '@navigators/AppRouters'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView, StatusBar } from 'react-native'
const App = () => {
  return (
    <>
      <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />

      <NavigationContainer>
        <AppRouters />
      </NavigationContainer>
    </>
  )
}
export default App
