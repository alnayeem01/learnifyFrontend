import React from 'react'

import Verification from './src/views/auth/Verification'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/navigation/AuthNavigator'
import { Provider } from 'react-redux'
import store from './src/store'

const App = () => {
  return (
    // <Provider> makes the Redux store available to all components in the app
    <Provider store={store}>

      {/* <NavigationContainer> manages the navigation tree and state */}
      <NavigationContainer>

        {/* <AuthNavigator> contains your authentication screens (SignIn, SignUp, etc.) */}
        <AuthNavigator />

      </NavigationContainer>

    </Provider>


  )
}

export default App
