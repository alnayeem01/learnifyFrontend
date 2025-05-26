import React, { FC } from 'react'
import {  StyleSheet, ScrollView } from 'react-native'
import { useFetchUploadsByProfile } from '../../../hooks/query';
import colors from '../../utils/colors';
import AudioListItem from '../ui/AudioListItem';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';


interface Props{

}
const UploadsTab:FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile()
  
  //Loading ui for auiolistItem
  if(isLoading)
    return <AudioListLoadingUi items={15}/>
  
  //if there is no data insdie we will show this in UI 
  if(!data?.length)
  return <EmptyRecords title="There is no audio's." />

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

export default UploadsTab;