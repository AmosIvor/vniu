/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { AppProvider } from '@contexts'

const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
)

AppRegistry.registerComponent(appName, () => WrappedApp)
