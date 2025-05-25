import React, { FC, useState } from 'react'
import { StyleSheet, Text, ScrollView, Pressable, View } from 'react-native'
import { useFetchLatestAudios } from '../../hooks/query';
import PulseAnimationContainer from '../ui/PulseAnimationContainer';
import LatestUploads from '../components/LatestUploads';
import RecommendedAudios from '../components/RecommendedAudios';
import OptionsModal from '../components/OptionsModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import { AudioData } from '../@types/audio';
import client from '../api/client';
import { getFromAsyncStorage, keys } from '../utils/asyncStorage';
import catchAsyncError from '../api/catchError';
import { useDispatch } from 'react-redux';
import { updateNotification } from '../store/notificaton';
import PlaylistModal from '../components/PlaylistModal';



interface Props {

}

const Home: FC<Props> = props => {

  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [selectedAudio, setSelectedAudio] = useState<AudioData>()
  const dispatch = useDispatch()
  const handleOnFavPress = async ()=>{
    if(!selectedAudio) return;
    const token = await getFromAsyncStorage(keys.Auth_TOKEN);
    //send request with the audio id that we want to add to the favourite playlist 
    try{
      const {data} = await client.post('/favourite?audioId=' + selectedAudio.id,null, {
        headers:{
          Authorization: 'Bearer ' + token
        }
      });
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

  return (
    <ScrollView style={styles.container}>
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
          { title: 'Add to Playlist', icon: 'playlist-music'},
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
        visible={true}
        onRequestClose={() => console.log('object')}
        list={[]}       
      />
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
  
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