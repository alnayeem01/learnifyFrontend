import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Profile from '../views/Profile';
import ProfileSettings from '../components/profile/ProfileSettings';
import Verification from '../views/auth/Verification';
import { ProfileNavigatorStackParamList } from '../@types/navigation';

const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>(); 

interface Props {}

const ProfileNavigator: FC<Props> = props => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        >
            {/* This is the Profile tab screen */}
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
             <Stack.Screen name='Verification' component={Verification} />
        </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    container: {}
});

export default ProfileNavigator;