import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import AudioListModal from '../ui/AudioListModal';


interface Props{
    visible: boolean;
    onRequestClose(): void
}
const CurrentAudioList:FC<Props> = ({onRequestClose, visible}) => {
  return <AudioListModal visible={visible} onRequestClose={onRequestClose} header="Audio's on the way!" />
};

const styles = StyleSheet.create({
    container: {}
});

export default CurrentAudioList;