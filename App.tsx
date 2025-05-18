import React from 'react'

import Verification from './src/views/auth/Verification'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/navigation/AuthNavigator'
import { Provider } from 'react-redux'
import store from './src/store'
import AppNavigator from './src/navigation'
import AppContainer from './src/components/AppContainer'

const App = () => {
  return (
    // <Provider> makes the Redux store available to all components in the app
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  )
}

export default App
