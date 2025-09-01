import { FC } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useFetchFavourites } from '../../../hooks/query';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';
import AudioListItem from '../ui/AudioListItem';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../../store/player';
import useAudioController from '../../../hooks/useAudioController';
import AppView from '../AppView';


interface Props {

}
const FavouriteTab: FC<Props> = props => {
  const { data, isLoading } = useFetchFavourites()
  const { onGoingAudio } = useSelector(getPlayerState)
  const { onAudioPress } = useAudioController();
  if (isLoading) {
    return (<AudioListLoadingUi />)
  };

  if (!data?.length) {
    return <EmptyRecords title="There is no audio's in favourite playlist." />
  };

  return (
 
      <ScrollView style={styles.container}>
        {data?.map((item) => {
          return (
            <AudioListItem
              isPlaying={item.id === onGoingAudio?.id}
              key={item.id}
              audio={item}
              onPress={() => onAudioPress(item, data)}
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

export default FavouriteTab;