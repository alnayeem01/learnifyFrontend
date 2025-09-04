import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppModal from '../../ui/AppModal'
import { useDispatch, useSelector } from 'react-redux'
import { getModalState, updatePlaylistVisibility } from '../../store/PlaylistModal'
import { useFetchPlaylistAudio } from '../../../hooks/query'
import AudioListItem from './AudioListItem'
import { getPlayerState } from '../../store/player'
import useAudioController from '../../../hooks/useAudioController'
import colors from '../../utils/colors'
import AudioListLoadingUi from './AudioListLoadingUi'

const PlaylistAudioModal = () => {
    const { visible, selectedListId } = useSelector(getModalState);
    const { onGoingAudio } = useSelector(getPlayerState)
    const dispatch = useDispatch();
    const { data, isLoading } = useFetchPlaylistAudio(selectedListId || '');
    const { onAudioPress } = useAudioController();

    const handleOnRequestClose = () => {
        //thid will negate the visible value in redux Modal store
        dispatch(updatePlaylistVisibility(false))
    }
    
   

    return (
        <AppModal visible={visible} onRequestClose={handleOnRequestClose} >
            <Text style={{ padding: 10, color: colors.CONTRAST }} >{data?.title}</Text>
            <FlatList
                data={data?.audios}
                contentContainerStyle={{ paddingHorizontal: 10, marginVertical: 10 }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if(isLoading) return <AudioListLoadingUi  />
                    return <AudioListItem
                        onPress={()=>onAudioPress(item,data?.audios|| [])}
                        isPlaying={item.id === onGoingAudio?.id} audio={item}
                    />
                }}
            />
        </AppModal>
    )
}

export default PlaylistAudioModal