import { NavigationContainer } from '@react-navigation/native';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import AuthNavigator from './AuthNavigator';
import { useSelector } from 'react-redux';
import { getAuthState } from '../store/auth';
import TabNavigator from './TabNavigator';


interface Props {

}
const AppNavigator: FC<Props> = props => {
    const {loggedIn} = useSelector(getAuthState)
    return (
        <NavigationContainer>
            {loggedIn? <TabNavigator /> : <AuthNavigator />}   
        </NavigationContainer>
    )
};

export default AppNavigator;