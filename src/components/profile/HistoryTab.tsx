import React, { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable, RefreshControl } from 'react-native'
import { useFetchHistory } from '../../hooks/query';
import EmptyRecords from '../ui/EmptyRecords';
import AudioListLoadingUi from '../ui/AudioListLoadingUi';
import colors from '../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getClient } from '../../api/client';
import catchAsyncError from '../../api/catchError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { History, historyAudio } from '../../@types/audio';
import { useNavigation } from '@react-navigation/native';


interface Props {

}
const HistoryTab: FC<Props> = props => {
  const { data, isLoading, isFetching } = useFetchHistory();
  const queryClient = useQueryClient();
  const [selectedHistories, setSelectedHistories] = useState<string[]>([]);
  const reomoveMutate = useMutation({
    // mutationFn = the actual async call to your API that removes histories
    mutationFn: async (histories) => await removeHistories(histories),
    // onMutate runs immediately when mutation is triggered (before server responds)
    // we use it for an "optimistic update" → update the cache instantly for snappy UI
    onMutate: (histories: string[]) => {
      queryClient.setQueryData<History[]>(['histories'], (oldData) => {
        let newData: History[] = []
        if (!oldData) return newData
        // loop through current cached histories
        for (let data of oldData) {
          // filter out audios that match any of the "histories" ids we want to remove
          const filteredData = data.audios.filter((item) => !histories.includes(item.id))
          if (filteredData.length > 0) {
            newData.push({ id: data.id, audios: filteredData })
          }
        }
        return newData
      })
    },
  })
  const navigate = useNavigation();
  const removeHistories = async (histories: string[]) => {
    try {

      const client = getClient();
      // this will pass array of histories as query 
      const res = (await client).delete('history/?histories=' + JSON.stringify(histories));
      //invalidate previous history data
      queryClient.invalidateQueries({ queryKey: ['histories'] })
    } catch (e) {
      const errorMessage = catchAsyncError(e);
      console.log(errorMessage)
    }
  };

  const handleSingleHistoryDelete = async (audio: historyAudio) => {
    reomoveMutate.mutate([audio.id])
  };

  const handleOnLongPress = (audio: historyAudio) => {
    setSelectedHistories([audio.id])
  }

  const handleOnPress = (audio: historyAudio) => {
    //if audio already selected : unselect it 
    //else select audio
    setSelectedHistories((prev) => {
      if (prev.includes(audio.id)) {
        return prev.filter((item) => audio.id !== item) // this will return audios other than filtered one
      }
      return [...prev, audio.id]
    })
  }

  const handleMultipleHistoryDelete = async () => {
    setSelectedHistories([]); // this will refresh the array after this function is called
    reomoveMutate.mutate(selectedHistories);
  }

  // this will enforeceh refetch onRefresh
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['histories'] })
  }

  //this useEffect clear selectedHistorie on naviagte to other screen
  useEffect(() => {
    const unSelectHistory = () => {
      setSelectedHistories([])
    };
    navigate.addListener('blur', unSelectHistory);

    // useEffect can return a cleanup function that runs on unmount or before re-running the effect.
    // Use it to remove listeners or cancel subscriptions to prevent memory leaks.
    return () => {
      navigate.removeListener('blur', unSelectHistory)
    }
  }, [])

  //Loading state UI
  if (isLoading) {
    return (<View style={styles.container} ><AudioListLoadingUi /></View>
    )
  };

  //histoires UI 
  return (
    <>
      {selectedHistories.length ? <Pressable onPress={handleMultipleHistoryDelete} style={styles.removeBtn}>
        <Text style={styles.removeBtnText}>Remove</Text>
      </Pressable> : null}

      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            tintColor={colors.CONTRAST}
            colors={[colors.PRIMARY]}
            onRefresh={handleRefresh}
          />
        }
      >
        {/* empty data UI */}
        {!data || !data[0]?.audios?.length  ? 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <EmptyRecords title='There is no history!' />
        </View> : null}

        {/* loop over items in history  */}
        {data?.map((item, index) => {
          return (
            <View key={index + item.id}>
              {/* this is the date */}
              <Text style={styles.date}>{item.id}</Text>
              {/* loop over the fierst audios array in first item in history */}
              <View style={styles.listcontainer}>
                {
                item?.audios?.map((audio, index) => {
                  return (
                    <Pressable
                      onLongPress={() => handleOnLongPress(audio)}
                      onPress={() => handleOnPress(audio)}
                      style={[styles.history, {
                        backgroundColor: selectedHistories.includes(audio.id) ? colors.INACTIVE_CONTRAST : colors.OVERLAY  // if the audio is in selected history than change the bgColor of that history 
                      }]}
                      key={audio.id + index}
                    >
                      <Text style={styles.historyTitle}>{audio.title}</Text>
                      {/* here we will call handelSingleHistoryDelete function */}
                      <Pressable onPress={() => handleSingleHistoryDelete(audio)} >
                        <AntDesign name='close' color={colors.CONTRAST} />
                      </Pressable>
                    </Pressable>
                  )
                })}
              </View>
            </View>
          )
        })}
      </ScrollView>
    </>
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
  },
  removeBtn: {
    padding: 10,
    alignSelf: 'flex-end'
  },
  removeBtnText: {
    color: colors.CONTRAST
  }

});

export default HistoryTab;