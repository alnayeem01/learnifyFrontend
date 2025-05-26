import { FC } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useFetchFavourites } from '../../../hooks/query';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';
import AudioListItem from '../ui/AudioListItem';


interface Props{

}
const FavouriteTab:FC<Props> = props => {
  const {data, isLoading} = useFetchFavourites()
  
  //Loading ui for auiolistItem
  if(isLoading)
    return <AudioListLoadingUi items={8}/>
  
  //if there is no data insdie we will show this in UI 
  if(!data?.length)
  return <EmptyRecords title="There is no audio's in favourite playlist." />

  return(
    <ScrollView style={styles.container}>
     {data?.map((item)=>{
      return (
        //passing the audio to our component AudioListItem component 
        <AudioListItem key={item.id} audio={item} />
      )
     })}
    </ScrollView>
  ) 
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      padding: 10
    },
});

export default FavouriteTab;