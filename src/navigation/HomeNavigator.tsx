import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Profile from '../views/Profile';
import ProfileSettings from '../components/profile/ProfileSettings';
import Verification from '../views/auth/Verification';
import { HomeNavigatorStackParamList, ProfileNavigatorStackParamList } from '../@types/navigation';
import Home from '../views/Home';
import PUblicProfile from '../views/PUblicProfile';


const Stack = createNativeStackNavigator<HomeNavigatorStackParamList>(); 

interface Props {}

const HomeNavigator: FC<Props> = props => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            {/* This is the Home tab screen */}
            <Stack.Screen name='HomeScreen' component={Home} />
            <Stack.Screen name='PublicProfile' component={PUblicProfile} />
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {}
});

export default HomeNavigator;