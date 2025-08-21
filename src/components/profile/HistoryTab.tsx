import React, { FC, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { useFetchHistory } from '../../../hooks/query';
import EmptyRecords from '../ui/EmptyRecords';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import colors from '../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';


interface Props {

}
const HistoryTab: FC<Props> = props => {
  const { data, error, isLoading } = useFetchHistory()

  //Loading state UI
  if (isLoading) {
    return (<View style={styles.container} ><AudioListLoadingUi /></View>
    )
  };
  // Empty Data UI
  if (!data?.length) {
    return (
      <EmptyRecords title='There is records on your history!' />
    )
  }
  //histoires UI 
  return (
    <ScrollView style={styles.container}>
      {/* loop over items in history  */}
      {data.map((item, index) => {
        return (
          <View key={index + item.id}>
            {/* this is the date */}
            <Text style={styles.date}>{item.id}</Text>
            {/* loop over the fierst audios array in first item in history */}
            <View style={styles.listcontainer}>
              {item.audios.map((audio, index) => {
                return (
                  <View style={styles.history} key={audio.id + index}>
                    <Text style={styles.historyTitle}>{audio.title}</Text>
                    <Pressable>
                      <AntDesign name='close' color={colors.CONTRAST} />
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </View>
        )
      })}
    </ScrollView>
  )

};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
   listcontainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: colors.OVERLAY,
    alignItems: 'center',
    justifyContent: 'center'

  },
  date: {
    color: colors.SECONDARY,
    marginBottom: 10
  },
  historyTitle: {
    color: colors.CONTRAST,
    paddingHorizontal: 5,
    fontWeight: '700',
    flex: 1
  },
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OVERLAY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  }

});

export default HistoryTab;