import { FC } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native'
import { PlayList } from '../../@types/audio';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Props {
    playlist: PlayList,
    onPress?(): void
}
const PlayListItem: FC<Props> = ({ playlist, onPress}) => {
    const { id, itemsCount, title, visibility } = playlist
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <MaterialCommunityIcons
                        name='playlist-music'
                        size={24}
                        color={colors.CONTRAST}
                        style={{ marginRight: 8 }}
                    />
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <FontAwesome size={16} color={colors.SECONDARY} name={visibility == "public" ? 'globe' : 'lock'} />
                    <Text style={styles.count}>{itemsCount}{itemsCount > 1 ? ' audios' : ' audio'}</Text>
                </View>
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        padding: 15,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: colors.OVERLAY,

    },
    poster: {
        backgroundColor: colors.OVERLAY,
        height: 50,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: colors.CONTRAST,
        fontWeight: 'bold',
        marginBottom: 5
    },
    titleContainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        padding: 10
    },
    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',

    },
    count: {
        color: colors.SECONDARY,
        fontWeight: 'bold',
        marginLeft: 5
    }
});

export default PlayListItem;