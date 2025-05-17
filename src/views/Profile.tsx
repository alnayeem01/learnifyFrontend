import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'


interface Props{

}
const Profile:FC<Props> = props => {
  return <View style={styles.container}>
    <Text>prolfile</Text>
  </View>
};

const styles = StyleSheet.create({
    container: {}
});

export default Profile;