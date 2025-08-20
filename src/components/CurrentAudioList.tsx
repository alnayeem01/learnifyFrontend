import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import AudioListModal from '../ui/AudioListModal';
import { getPlayerState } from '../store/player';
import { useSelector } from 'react-redux';


interface Props{
    visible: boolean;
    onRequestClose(): void
}
const CurrentAudioList:FC<Props> = ({onRequestClose, visible}) => {
    const { onGoingList} = useSelector(getPlayerState)
  return <AudioListModal data={onGoingList} visible={visible} onRequestClose={onRequestClose} header="Audio's on the way!" />
};

const styles = StyleSheet.create({
    container: {}
});

export default CurrentAudioList;