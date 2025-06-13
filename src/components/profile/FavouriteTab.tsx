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
  

  // if(isLoading){
  //   return(<> <AudioListLoadingUi /></>
  // )
  // };
  
  if(!data?.length){
    return <EmptyRecords title="There is no audio's in favourite playlist." />
  };

  return(
    <ScrollView style={styles.container}>
     {data?.map((item)=>{
      return (
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
    }
});

export default FavouriteTab;