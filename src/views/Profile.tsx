import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UploadsTab from '../components/profile/UploadsTab';
import PlaylistTab from '../components/profile/PlaylistTab';
import FavouriteTab from '../components/profile/FavouriteTab';
import HistoryTab from '../components/profile/HistoryTab';
import colors from '../utils/colors';

interface Props {
}
const Tab = createMaterialTopTabNavigator();
const Profile: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{
        tabBarStyle:styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle
      }}>
        <Tab.Screen name='Uploads' component={UploadsTab} />
        <Tab.Screen name='Playlist' component={PlaylistTab} />
        <Tab.Screen name='Favourites' component={FavouriteTab} />
        <Tab.Screen name='History' component={HistoryTab} />
      </Tab.Navigator>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabBarStyle:{
    backgroundColor: 'transparent',
    elevation: 0,                     //removes shadow for android
    shadowRadius: 0,                  //these four linr from here removes shadow for ios
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0
  },
  tabBarLabelStyle:{
    color: colors.CONTRAST,
    fontSize: 12
  }
});

export default Profile;