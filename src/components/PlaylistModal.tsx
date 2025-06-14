import { FC, JSX, ReactNode } from 'react'
import { StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import BasicModalContainer from './ui/BasicModalContainer';
import colors from '../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { PlayList } from '../@types/audio';

interface Props {
    visible: boolean;
    onRequestClose(): void
    list: PlayList[],
    onCreateNewPress(): void
    onPlayListPress(item : PlayList): void
}
interface ListItemProps {
    title: string,
    icon: ReactNode;
    onPress?(): void
}

const ListItem: FC<ListItemProps> = ({ title, icon, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.listContainer}>
            {icon}
            <Text style={styles.listItemTitle}>{title} </Text>
        </Pressable>
    )
}
const PlaylistModal: FC<Props> = ({ list, visible, onRequestClose, onCreateNewPress, onPlayListPress  }) => {
    return (
        <BasicModalContainer onRequestClose={onRequestClose} visible={visible}>
            {/* We want to render playlist */}
            <ScrollView>
                { list.map((item) => {
                    return (
                        <ListItem
                        onPress={()=> onPlayListPress(item)}
                            key={item.id}
                            title={item.title}
                            // if visibility private show lock icon else globe icon 
                            icon={<FontAwesome size={20} name={item.visibility =="public" ? 'globe': 'lock'}color={colors.PRIMARY} />}
                        />
                    )
                })}
            </ScrollView>

            {/* Create Playlist (new) button */}
            <ListItem
                title='Create New'
                icon={<AntDesign name='plus' size={20} color={colors.PRIMARY} />}
                onPress={onCreateNewPress}
            />
        </BasicModalContainer>
    )
};

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45
    },
    listItemTitle: {
        fontSize: 16,
        color: colors.PRIMARY,
        marginLeft: 5
    }
});

export default PlaylistModal;