import React, { FC, useState } from 'react'
import { StyleSheet, Text, ScrollView, Pressable, View } from 'react-native'
import { useFetchPlaylist } from '../../hooks/query';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudios from '../components/RecommendedAudios';
import OptionsModal from '../components/OptionsModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import { AudioData, PlayList } from '../@types/audio';
import client, { getClient } from '../api/client';
import { getFromAsyncStorage, keys } from '../utils/asyncStorage';
import catchAsyncError from '../api/catchError';
import { useDispatch } from 'react-redux';
import { updateNotification } from '../store/notificaton';
import PlaylistModal from '../components/PlaylistModal';
import PlaylistForm, { PlayListInfo } from '../components/PlaylistForm';



interface Props {

}

const Home: FC<Props> = props => {

  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [showPlaylistModal, setShowPlaylistModal] = useState<boolean>(false)
   const [showPlayListFormModal, setShowPlayListFormModal] = useState<boolean>(false)
  const [selectedAudio, setSelectedAudio] = useState<AudioData>()

  const {data}  = useFetchPlaylist()
  const dispatch = useDispatch()
  const handleOnFavPress = async ()=>{
    if(!selectedAudio) return;
    //send request with the audio id that we want to add to the favourite playlist 
    try{
      const client = await getClient()
      const {data} = await client.post('/favourite?audioId=' + selectedAudio.id,null);
    }catch(e){
        const errorMessage = catchAsyncError(e);
        dispatch(updateNotification({ message: errorMessage, type: 'error' }));
    }
     //once added in fav reset the state 
      setSelectedAudio(undefined)
      //close the modal
      setShowOptions(false);
  };
  const handleOnLongPress =(audio: AudioData)=>{
    setSelectedAudio(audio);
    setShowOptions(true);
  };

  const handleOnAddToPlaylist =()=>{
    setShowPlaylistModal(true);
    setShowOptions(false)
  };

  const handlePlaylistSubmit =async (value: PlayListInfo)=>{
    try{
      if(!value.title.trim()) return;
      const client = await getClient();
      const {data} = await client.post('playlist/create',{
        resId: selectedAudio?.id,
        title: value.title,
        visibility: value.private ? 'private' : 'public'
      })
    }catch(e){
      console.log(catchAsyncError(e))
    }
  }

  const updatePlayList = async (item: PlayList)=>{
      try{
        const client = await getClient()
        const {data} = await client.patch('/playlist/update',{
          id: item.id,
          item : selectedAudio?.id,
          title: item.title,
          visibility: item.visibility
        },);
        setSelectedAudio(undefined);
        setShowPlaylistModal(false)
        dispatch(updateNotification({type: 'success', message: 'Playlist Updated'}))
      }catch(e){
        console.log(e)
      }
  }

  return (
    <View style={styles.container}>
      <LatestUploads
        onAudioLongPress={ handleOnLongPress}
        onAudioPress={() => console.log('object')}
      />
      <RecommendedAudios
        onAudioLongPress={handleOnLongPress}
        onAudioPress={(item) => console.log('Hellp')}
      />
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false)
        }}
        options={[
          { title: 'Add to Playlist', icon: 'playlist-music', onPress:handleOnAddToPlaylist},
          { title: 'Add to favourite', icon: 'cards-heart',  onPress: handleOnFavPress },
        ]}
        renderItem={(item: any) => {
          return (
              <Pressable 
              style={styles.optionContainer}
              onPress={item.onPress}
              >
                <MaterialCommunityIcons size={24} name={item.icon} color={colors.PRIMARY} />
                <Text style={styles.optionTitle}>{item.title}</Text>
              </Pressable>
          )
        }}
      />
      <PlaylistModal 
        onPlayListPress={updatePlayList}
        visible={showPlaylistModal} 
        onRequestClose={() => {
        setShowPlaylistModal(false);}} 
        list={data ||[]} 
        onCreateNewPress={()=>{
          setShowPlaylistModal(false);
          setShowPlayListFormModal(true)
        }} 
      />
      <PlaylistForm 
        visible={showPlayListFormModal} 
        onRequestClose={() => setShowPlayListFormModal(false)}
        onSubmit={handlePlaylistSubmit}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  optionContainer:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10
  },
  optionTitle:{
    color: colors.PRIMARY, 
    fontSize: 16, 
    marginLeft: 5
  }
});

export default Home;