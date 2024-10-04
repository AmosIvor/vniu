import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { AppProvider } from '@contexts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const WrappedApp = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <App />
    </AppProvider>
  </QueryClientProvider>
)

AppRegistry.registerComponent(appName, () => WrappedApp)
