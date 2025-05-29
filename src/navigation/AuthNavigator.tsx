import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from "../views/auth/SignIn"
import SignUp from "../views/auth/SignUp"
import LostPassword from "../views/auth/LostPassword"
import Verification from "../views/auth/Verification"
import { AuthStackParamList } from '../@types/navigation';


const Stack = createNativeStackNavigator<AuthStackParamList>()


const AuthNavigator = () => {
    // Selects the authentication state from the Redux store using the `getAuthState` selector.
    // `useSelector` subscribes to the Redux store and re-renders the component
    // whenever the selected auth state changes.
    // const authState = useSelector(getAuthState);
    // console.log(authState)
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="LostPassword" component={LostPassword} />
            <Stack.Screen name="Verification" component={Verification} />
        </Stack.Navigator>
    )
}

export default AuthNavigator