import React, { FC } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useFetchPlaylist } from '../../../hooks/query';
import PlayListItem from '../ui/PlayListItem';
import { PlayList } from '../../@types/audio';


interface Props{

}
const PlaylistTab:FC<Props> = props => {


  // this hook fetches playlists
  const {data, isLoading} = useFetchPlaylist();


  return <ScrollView style={styles.container}>
      {data?.map((playlist : PlayList)=>{
        return(
            <PlayListItem key={playlist.id}  playlist ={playlist} />
        )
      })}
  </ScrollView>
};

const styles = StyleSheet.create({
    container: {}
});

export default PlaylistTab;