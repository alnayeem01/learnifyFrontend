import { FC } from 'react'
import { View, StyleSheet, Pressable, Image, Text } from 'react-native'
import colors from '../../utils/colors';
import { AudioData } from '../../@types/audio';
import PlayAnimation from '../../ui/PlayAnimation';
import { isPlaying } from 'react-native-track-player';
import useAudioController from '../../hooks/useAudioController';


interface Props {
    audio: AudioData,
    onPress?(): void,
    isPlaying: boolean
    onLongPress?(): void
}
const AudioListItem: FC<Props> = ({audio, onPress,isPlaying,onLongPress }) => {

    //helper function to dynamically chose iamge if no image passed then we pick our loacl image 
    const getsource = (poster?: string) => {
        return poster ? { uri: poster } : require('../../../assets/images/music.jpg')
    };

    return (
        <Pressable onLongPress={onLongPress} onPress={onPress} style={styles.listItem}>
            <View>
                <Image source={getsource(audio.poster)} style={styles.poster} />
                <PlayAnimation visible={isPlaying} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{audio.title}</Text>
                <Text style={styles.owner} numberOfLines={1} ellipsizeMode='tail'>{audio.owner.name}</Text>
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    poster: {
        width: 50,
        height: 50,
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: '700'
    },
    owner: {
        color: colors.SECONDARY
    },
    listItem: {
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: colors.OVERLAY,
        borderRadius: 5,
        overflow: 'hidden'
    },
    titleContainer: {
        flex: 1,
        padding: 5,
    }
});

export default AudioListItem;