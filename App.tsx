import React from 'react'

import Verification from './src/views/auth/Verification'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/navigation/AuthNavigator'

const App = () => {
  return (
     <NavigationContainer>
       <AuthNavigator />
     </NavigationContainer>

  )
}

export default App
