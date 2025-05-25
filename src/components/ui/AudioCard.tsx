import { FC } from 'react'
import { View, StyleSheet, Pressable, Text, Image } from 'react-native'
import colors from '../../utils/colors';


interface Props {
    title: string;
    poster?: string;
    onPress? (): void;
    onLongPress? (): void
}
const AudioCard: FC<Props> = ({ poster, title, onPress, onLongPress }) => {
    const source = poster ? { uri: poster } : require('../../../assets/images/music.jpg')
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
        >
            <Image source={source} style={styles.poster} />
            <Text
                ellipsizeMode='tail'
                numberOfLines={2}
                style={styles.title}
            >
                {title}
            </Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 100,
        marginRight: 15,
        padding: 10
    },
    poster: {
        height: 100,
        aspectRatio: 1,
        borderRadius: 20
    },
    title: {
        color: colors.CONTRAST,
        fontSize: 24,
        paddingVertical: 10
    }
});

export default AudioCard;