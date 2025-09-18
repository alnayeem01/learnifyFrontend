import React, { FC, useState } from 'react'
import { StyleSheet, ScrollView, Text, Pressable } from 'react-native'
import { useFetchUploadsByProfile } from '../../hooks/query';
import AudioListItem from '../ui/AudioListItem';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';
import useAudioController from '../../hooks/useAudioController';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../../store/player';
import AppView from '../AppView';
import { AudioData } from '../../@types/audio';
import OptionsModal from '../OptionsModal';
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../../utils/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProfileNavigatorStackParamList } from '../../@types/navigation';


interface Props {

}
const UploadsTab: FC<Props> = props => {
  const { data, isLoading } = useFetchUploadsByProfile()
  const { onAudioPress } = useAudioController();
  const { onGoingAudio } = useSelector(getPlayerState)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [selectedAudio, setSelectedAudio ] = useState<AudioData>()
  const {navigate} = useNavigation<NavigationProp<ProfileNavigatorStackParamList>>()

  const handleOnLongPress = (audio: AudioData) => {
    console.log(audio)
    setSelectedAudio(audio)
    setShowOptions(true);
  };

  const handleOnEditPress =()=>{
    setShowOptions(false)
    if(!selectedAudio) return;
    navigate('UpdateAudio', {item: selectedAudio})
  }

  //Loading ui for auiolistItem
  if (isLoading)
    return <AudioListLoadingUi items={15} />

  // //if there is no data insdie we will show this in UI
  if (!data?.length)
    return <EmptyRecords title="There is no audio's." />
  //passing the audio to our component AudioListItem component
  return (
    <>
      <OptionsModal
        visible={showOptions}
        onRequestClose={() => {
          setShowOptions(false)
        }}
        options={[
          {
            title: 'Edit',
            icon: 'edit',
            onPress: handleOnEditPress
          },
        ]}
        renderItem={(item: any) => {
          return (
            <Pressable
              style={styles.optionContainer}
              onPress={item.onPress}
            >
              <AntDesign size={24} name={item.icon} color={colors.PRIMARY} />
              <Text style={styles.optionTitle}>{item.title}</Text>
            </Pressable>
          )
        }}
      />
      <AppView>
        <ScrollView style={styles.container}>
          {data?.map((item) => {
            return (
              <AudioListItem
                onLongPress={() => handleOnLongPress(item)}
                isPlaying={item.id === onGoingAudio?.id}
                onPress={() => onAudioPress(item, data)}
                key={item.id}
                audio={item}
              />
            )
          })}
        </ScrollView>
      </AppView>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 480,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  optionTitle: {
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 5
  }
});

export default UploadsTab;