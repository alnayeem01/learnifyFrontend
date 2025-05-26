import React, { FC } from 'react'
import { View, StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native'
import { useFetchUploadsByProfile } from '../../../hooks/query';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../../utils/colors';
import AudioListItem from '../ui/AudioListItem';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import EmptyRecords from '../ui/EmptyRecords';


interface Props{

}
const UploadsTab:FC<Props> = props => {
  const {data, isLoading} = useFetchUploadsByProfile()
  console.log(data)
  
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
        <AudioListItem audio={item} />
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
    poster:{
      width: 50,
      height: 50,
    },
    title:{
      color: colors.CONTRAST,
      fontWeight: '700'
    },
    owner:{
      color: colors.SECONDARY
    }, 
    listItem:{
      flexDirection: 'row',
      marginBottom: 15,
      backgroundColor: colors.OVERLAY,
      borderRadius: 5
    },
    titleContainer:{
      flex: 1,
      padding: 5,
    }
});

export default UploadsTab;