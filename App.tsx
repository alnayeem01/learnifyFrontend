import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import AppNavigator from './src/navigation'
import AppContainer from './src/components/AppContainer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


// Create a client for query
const queryClient = new QueryClient()


const App = () => {
  return (
    // <Provider> makes the Redux store available to all components in the app
    <Provider store={store}>
      {/* This is the provide for tanstack/react-query */}
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <AppNavigator />
        </AppContainer>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
