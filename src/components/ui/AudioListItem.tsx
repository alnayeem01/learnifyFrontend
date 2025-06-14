import { FC } from 'react'
import { View, StyleSheet, Pressable, Image, Text } from 'react-native'
import colors from '../../utils/colors';
import { AudioData } from '../../@types/audio';


interface Props {
    audio: AudioData,
    onPress?(): void
}
const AudioListItem: FC<Props> = ({audio, onPress}) => {

    //helper function to dynamically chose iamge if no image passed then we pick our loacl image 
    const getsource = (poster?: string) => {
        return poster ? { uri: poster } : require('../../../assets/images/music.jpg')
    };

    return (
        <Pressable onPress={onPress} style={styles.listItem}>
            <Image source={getsource(audio.poster)} style={styles.poster} />
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
        borderRadius: 5
    },
    titleContainer: {
        flex: 1,
        padding: 5,
    }
});

export default AudioListItem;