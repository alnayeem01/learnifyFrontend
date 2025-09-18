import { FC } from 'react'
import { View, StyleSheet, Text, Pressable, Image, FlatList } from 'react-native'
import { useFetchRecommendedPlaylist } from '../hooks/query';
import colors from '../utils/colors';
import { PlayList } from '../@types/audio';
import EmptyRecords from './ui/EmptyRecords';



interface Props {
  onListPress(playlist: PlayList): void
}
const RecommendedPlaylist: FC<Props> = ({onListPress}) => {
  const { data } = useFetchRecommendedPlaylist();
  if(!data?.length){
    return null
  }
  return <View style={styles.container}>
    <Text style={styles.title}>Playlist For You</Text>
    <FlatList
      scrollEnabled
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable onPress={()=> onListPress(item)} style={styles.cardContainer} key={item.id}>
            <Image
              source={require('../assets/images/music.jpg')}
              style={styles.image}
            />
            <View style={styles.overlay}>
              <Text style={styles.titleSmall}>{item.title}</Text>

            </View>
          </Pressable>
        )
      }}
    />
  </View>
};
const cardSize = 150
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,

  },
  title: {
    color: colors.CONTRAST, padding: 5, fontSize: 20, fontWeight: 'bold', marginBottom: 15
  },
  image: {
    width: cardSize,
    height: cardSize,
    borderRadius: 10
  },
  cardContainer: {
    margin: 15
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.OVERLAY,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  titleSmall:{
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default RecommendedPlaylist;