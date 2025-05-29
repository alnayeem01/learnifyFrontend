import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import AppHeader from '../AppHeader';


interface Props{

}
const ProfileSettings:FC<Props> = props => {
  return <View style={styles.container}>
    <AppHeader title='Settings' />
  </View>
};

const styles = StyleSheet.create({
    container: {}
});

export default ProfileSettings;