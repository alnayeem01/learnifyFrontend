import { FC } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';
import AppLink from '../ui/AppLink';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../store/player';


interface Props {
    visible: boolean,
    closeHandler(state: boolean): void
}
const AudioIfnoContainer: FC<Props> = ({ visible, closeHandler }) => {
    // get audio Info form redux
    const {onGoingAudio} = useSelector(getPlayerState)
    if (!visible) return null;

    const handleClose = () => {
        closeHandler(!visible)  //this will negate the value of visible
    };

    return <View style={styles.container}>
        <Pressable style={styles.closeBtn} onPress={(handleClose)}>
            <AntDesign name='close' color={colors.CONTRAST} size={26} />
        </Pressable>
        <ScrollView>
            <View>
                <Text style={styles.title}>{onGoingAudio?.title}</Text>
                <View style={styles.ownerInfo}>
                    <Text style={styles.title}>Create:  </Text>
                    <AppLink  title={onGoingAudio?.owner.name || ''} />
                </View>
                <Text style={styles.about}>{onGoingAudio?.about}</Text>
            </View>
        </ScrollView>
    </View>
};

const styles = StyleSheet.create({
    container: {
     ...StyleSheet.absoluteFillObject,
     backgroundColor: colors.PRIMARY,
     zIndex: 1,
     padding: 15
    },
    title: {
        fontSize: 18,
        color: colors.CONTRAST,
        fontWeight: 'bold',
        paddingVertical: 5
    },
    about: {
        fontSize: 16,
        color: colors.CONTRAST,
        paddingVertical: 5
    },
    closeBtn: {
        alignSelf: 'flex-end'
    },
    ownerInfo:{
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default AudioIfnoContainer;