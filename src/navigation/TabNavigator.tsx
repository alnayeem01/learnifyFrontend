import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../views/Home"
import Profile from "../views/Profile"
import Upload from "../views/Upload"
import colors from "../utils/colors"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import ProfileNavigator from "./ProfileNavigator"
import HomeNavigator from "./HomeNavigator"



const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.PRIMARY
            }
            }} 
        >
            <Tab.Screen name="HomeNavigator" component={HomeNavigator}  options={{
                tabBarIcon: (props)=>{
                    return <AntDesign name="home" color={props.color} size={props.size}/>
                },
                tabBarLabel: "Home"
            }} />
            {/* On This screen we are trying to render nested navigation */}
            <Tab.Screen name="ProfileNavigator" component={ProfileNavigator} options={{
                tabBarIcon: (props)=>{
                    return <AntDesign name="user" color={props.color} size={props.size}/>
                },
                tabBarLabel: "Profile"
            }} />
            <Tab.Screen name="UploadScreen" component={Upload} options={{
                tabBarIcon: (props) => {
                    return <Entypo name="folder-music" color={props.color} size={props.size} />;
                },
                tabBarLabel: "Upload"
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigator