import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AppView from '../components/AppView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeNavigatorStackParamList, PublicProfileTabParamList } from '../@types/navigation';
import { useFetchPulicProfile } from '../hooks/query';
import PublicProfileContainer from '../components/profile/PublicProfileContainer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import colors from '../utils/colors';
import PublicUploadsTab from '../components/profile/PublicUploadsTab';
import PublicPlayListTab from '../components/profile/PublicPlayListTab';


type Props = NativeStackScreenProps<HomeNavigatorStackParamList, 'PublicProfile'>
const Tab = createMaterialTopTabNavigator<PublicProfileTabParamList>();
const PUblicProfile: FC<Props> = (Props) => {
    const { ProfileId } = Props.route.params;
    const { data } = useFetchPulicProfile(ProfileId);
    return (
        <>
            <PublicProfileContainer profile={data} />
            <Tab.Navigator screenOptions={{
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: styles.tabBarLabelStyle
            }}>
                <Tab.Screen 
                    name='PublicUploads' 
                    component={PublicUploadsTab} 
                    options={{tabBarLabel: 'Uploads'}}
                    initialParams={{ProfileId}} 
                />
                <Tab.Screen 
                    name='PublicPlaylist' 
                    component={PublicPlayListTab}
                    options={{tabBarLabel: 'Playlist'}} 
                    initialParams={{ProfileId}} 
                />
            </Tab.Navigator>
        </>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    tabBarStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowRadius: 0,
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0
    },
    tabBarLabelStyle: {
        color: colors.CONTRAST,
        fontSize: 12
    }
});

export default PUblicProfile;