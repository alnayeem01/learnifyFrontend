import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'


interface Props{

}
const FavouriteTab:FC<Props> = props => {
  return <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Favourite</Text>
  </View>
};

const styles = StyleSheet.create({
    container: {}
});

export default FavouriteTab;