import React, { FC } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useFetchPlaylist } from '../../hooks/query';
import PlayListItem from '../ui/PlayListItem';
import { PlayList } from '../../@types/audio';
import AppView from '../AppView';
import EmptyRecords from '../ui/EmptyRecords';
import { useDispatch } from 'react-redux';
import { updatePlaylistVisibility, updateSelectedListID } from '../../store/PlaylistModal';


interface Props {

}
const PlaylistTab: FC<Props> = props => {


  // this hook fetches playlists
  const { data, isLoading } = useFetchPlaylist();
  const dispatch = useDispatch();
  const handleOnRequestClose = () => {
    //thid will negate the visible value in redux Modal store
    dispatch(updatePlaylistVisibility(false))
  }
  const handleOnListPress = (playlsit: PlayList) => {
    dispatch(updateSelectedListID(playlsit.id))
    dispatch(updatePlaylistVisibility(true))
  }

  return <AppView>
    <ScrollView style={styles.container}>
      {!data ? <EmptyRecords title='No Playlist found!' /> : null}
      {data?.map((playlist: PlayList) => {
        return (
          <PlayListItem onPress={() => handleOnListPress(playlist)} key={playlist.id} playlist={playlist} />
        )
      })}
    </ScrollView>
  </AppView>
};

const styles = StyleSheet.create({
  container: {}
});

export default PlaylistTab;