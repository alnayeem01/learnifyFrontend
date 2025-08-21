import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import AudioListModal from '../ui/AudioListModal';
import { getPlayerState } from '../store/player';
import { useSelector } from 'react-redux';
import useAudioController from '../../hooks/useAudioController';


interface Props {
    visible: boolean;
    onRequestClose(): void
}
const CurrentAudioList: FC<Props> = ({ onRequestClose, visible }) => {
    const { onGoingList } = useSelector(getPlayerState);
    const { onAudioPress} = useAudioController();
    return <AudioListModal 
            data={onGoingList} 
            visible={visible} 
            onRequestClose={onRequestClose} header="Audio's on the way!" 
            loading={false} //later find how to pass the loading state here for current playlist audios 
            onItemPress={onAudioPress}
        />
};

const styles = StyleSheet.create({
    container: {}
});

export default CurrentAudioList;