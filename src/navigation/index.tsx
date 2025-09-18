import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { FC, useEffect } from 'react'
import AuthNavigator from './AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, updateBusyState, updateLoggedInState, updateProfile } from '../store/auth';
import TabNavigator from './TabNavigator';
import { getFromAsyncStorage, keys } from '../utils/asyncStorage';
import client from '../api/client';
import Loader from '../ui/Loader';
import { StyleSheet, View } from 'react-native';
import colors from '../utils/colors';
import BootSplash from "react-native-bootsplash";

interface Props {
}

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.PRIMARY,
        primary: colors.CONTRAST
    }
}

const AppNavigator: FC<Props> = props => {
    const { loggedIn, busy } = useSelector(getAuthState)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAuthInfo = async () => {
            //update bsuy state to show loader 
            dispatch(updateBusyState(true))
            try {
                const token = await getFromAsyncStorage(keys.Auth_TOKEN)
                if (!token){
                    dispatch(updateBusyState(false));
                    return;
                }
                const { data } = await client.get("/auth/is-auth", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                dispatch(updateBusyState(false))
                dispatch(updateProfile(data.profile));
                dispatch(updateLoggedInState(true))
            } catch (e) {
                
            }
            dispatch(updateBusyState(false))
        }
        fetchAuthInfo()
    }, [])


    return (
        <NavigationContainer 
            theme={AppTheme}
            onReady={()=>BootSplash.hide()}
            >
            {busy ? <View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: colors.OVERLAY, justifyContent: "center", alignItems: "center", zIndex: 1
            }}><Loader /></View> : null}
            {loggedIn ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
};

export default AppNavigator;