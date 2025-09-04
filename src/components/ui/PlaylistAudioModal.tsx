import { View, Text } from 'react-native'
import React from 'react'
import AppModal from '../../ui/AppModal'
import { useDispatch, useSelector } from 'react-redux'
import { getModalState, updatePlaylistVisibility } from '../../store/PlaylistModal'

const PlaylistAudioModal = () => {
    const {visible} = useSelector(getModalState)
    const dispatch = useDispatch();
    const handleOnRequestClose = ()=>{
        //thid will negate the visible value in redux Modal store
        dispatch(updatePlaylistVisibility(false))
    }
  return (
    <AppModal visible={visible} onRequestClose={handleOnRequestClose} >
      <Text>PlaylistAudioModal</Text>
    </AppModal>
  )
}

export default PlaylistAudioModal