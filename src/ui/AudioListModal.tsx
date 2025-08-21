import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../utils/colors';
import AppModal from './AppModal';
import { AudioData } from '../@types/audio';
import { FlatList } from 'react-native-gesture-handler';
import AudioListItem from '../components/ui/AudioListItem';
import AudioListLoadingUi from '../components/ui/AudioListLoadingUi';
import { useSelector } from 'react-redux';
import { getPlayerState, updateOnGoingAudio } from '../store/player';


interface Props {
    data: AudioData[]
    header: string,
    visible: boolean,
    onRequestClose(): void,
    loading: boolean,
    onItemPress(item: AudioData, data: AudioData[]): void
}
const AudioListModal: FC<Props> = ({ header, data, visible, onRequestClose, loading, onItemPress }) => {
    const { onGoingAudio } = useSelector(getPlayerState)
    return <AppModal visible={visible} onRequestClose={onRequestClose} >
        <View style={styles.container}>
            {loading ? <AudioListLoadingUi /> :
                <><Text style={styles.header}>{header}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => {
                            return (
                                <AudioListItem onPress={() => onItemPress(item, data)} audio={item}
                                    isPlaying={onGoingAudio?.id === item.id}
                                />
                            )
                        }}
                    />
                </>}
        </View>
    </AppModal>
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.CONTRAST,
        paddingVertical: 10
    }
});

export default AudioListModal;