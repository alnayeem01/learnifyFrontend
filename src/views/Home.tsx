import { FC } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { useDispatch } from 'react-redux';
import { updateNotification } from '../store/notificaton';


interface Props {

}
const Home: FC<Props> = props => {
  const dispatch = useDispatch()
  return <View style={styles.container}>
    <Text>Home</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {}
});

export default Home;