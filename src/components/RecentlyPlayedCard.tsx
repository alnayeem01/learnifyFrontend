import { FC } from 'react'
import { View, StyleSheet, Image, Pressable, Text } from 'react-native'
import { useSelector } from 'react-redux';
import { getPlayerState } from '../store/player';
import colors from '../utils/colors';


interface Props {
    title: string,
    poster: string
    onPress(): void
}
const RecentlyPlayedCard: FC<Props> = ({ onPress, poster, title }) => {
    const { onGoingAudio } = useSelector(getPlayerState)
    const source = onGoingAudio?.poster ? { uri: onGoingAudio.poster.url } : require('../../assets/images/music.jpg')
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image source={source} style={styles.poster} />
            <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail' >{title}</Text>
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.OVERLAY,
        width: '45%',
        borderRadius: 5,
        flexDirection: 'row',
        gap: 15,
    },
    poster: {
        width: 50,
        height: 50
    },
    title:{
        color: colors.CONTRAST,
        fontWeight: '500'
    },
    titleContainer:{
        flex:1,
        paddingHorizontal: 2
    }
});

export default RecentlyPlayedCard;