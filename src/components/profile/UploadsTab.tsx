import React, { FC } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { useFetchUploadsByProfile } from '../../../hooks/query';
import AudioListItem from '../ui/AudioListItem';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';
import useAudioController from '../../../hooks/useAudioController';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../../store/player';
import AppView from '../AppView';



interface Props {

}
const UploadsTab: FC<Props> = props => {
  const { data, isLoading } = useFetchUploadsByProfile()
  const { onAudioPress } = useAudioController();
  const { onGoingAudio } = useSelector(getPlayerState)

  //Loading ui for auiolistItem
  if (isLoading)
    return <AudioListLoadingUi items={15} />

  // //if there is no data insdie we will show this in UI 
  if (!data?.length)
    return <EmptyRecords title="There is no audio's." />

  //passing the audio to our component AudioListItem component 
  return (
      <ScrollView style={styles.container}>
        {data?.map((item) => {
          return (
            <AudioListItem
              isPlaying={item.id === onGoingAudio?.id}
              onPress={() => onAudioPress(item, data)}
              key={item.id}
              audio={item}
            />
          )
        })}
      </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});

export default UploadsTab;