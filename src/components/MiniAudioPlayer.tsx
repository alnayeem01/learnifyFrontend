import { FC } from 'react'
import { View, StyleSheet, Image, Text, Pressable, ActivityIndicator } from 'react-native'
import colors from '../utils/colors';
import { useSelector } from 'react-redux';
import { getPlayerState } from '../store/player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlayPauseBtn from '../ui/PlayPauseBtn';
import useAudioController from '../../hooks/useAudioController';
import Loader from '../ui/Loader';
import { useProgress } from 'react-native-track-player';
import { mapRange } from '../utils/math';


interface Props {

}

export const MiniPlayerHeight = 60
const MiniAudioPlayer: FC<Props> = props => {
    const { onGoingAudio } = useSelector(getPlayerState);
    const {isPlaying, togglePlayPause, isBusy} = useAudioController();
    // useProgress hook from react-native-track-player 
    const progress = useProgress()
    const source = onGoingAudio?.poster?.url ? { uri: onGoingAudio.poster?.url } : require('../../assets/images/music.jpg')
    return (
        <>
        <View style={{
            height: 2,
            backgroundColor: colors.SECONDARY,
            width: `${mapRange({
                outputMin: 0,
                outputMax: 100,
                inputMin: 0,
                inputMax: progress.duration,
                inputValue: progress.position
            })}%`
         }}/>
        <View style={styles.container}>
            <View>
                <Image source={source} style={styles.poster} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{onGoingAudio?.title}</Text>
                <Text style={styles.owner}>{onGoingAudio?.owner.name}</Text>
            </View>
            <Pressable style={{ paddingHorizontal: 10 }}>
                <AntDesign name='hearto' size={24} color={colors.CONTRAST} />
            </Pressable>
            {!isBusy ? 
            <PlayPauseBtn 
            playing={isPlaying}
            onPress={togglePlayPause}
            /> :
            <Loader />
        }
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        height: MiniPlayerHeight,
        backgroundColor: colors.OVERLAY,
        padding: 5,
        paddingLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    poster: {
        height: MiniPlayerHeight - 10,
        aspectRatio: 1,
        borderRadius: 5
    },
    contentContainer: {
        flex: 1,
        height: '100%',
        padding: 5
    },
    title: {
        color: colors.CONTRAST,
        fontWeight: '700'
    },
    owner: {
        color: colors.SECONDARY,
        fontWeight: '700'
    }
});

export default MiniAudioPlayer;