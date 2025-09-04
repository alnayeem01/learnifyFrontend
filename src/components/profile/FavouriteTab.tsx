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
import { RefreshControl } from 'react-native-gesture-handler';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import colors from '../../utils/colors';


interface Props {

}
const FavouriteTab: FC<Props> = props => {
  const { data, isLoading, isFetching } = useFetchFavourites()
  const { onGoingAudio } = useSelector(getPlayerState)
  const { onAudioPress } = useAudioController();
  const queryClient = useQueryClient()
  if (isLoading) {
    return (<AudioListLoadingUi />)
  };

  const handleOnRefresh =async()=>{
    await queryClient.invalidateQueries({queryKey:['favourite']})
  }

  return (
    <AppView>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={handleOnRefresh} tintColor={colors.CONTRAST} />
        }
      >
        {/* if data is empty */}
        {
          (!data?.length) ?  
          <EmptyRecords title="There is no audio's in favourite playlist." /> : null 
        }
        {/* if data is not empty */}
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
    </AppView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export default FavouriteTab;