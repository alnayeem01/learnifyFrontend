import { FC } from 'react'
import { View, StyleSheet, Image, Text, Pressable } from 'react-native'
import AppModal from './AppModal';
import { useSelector } from 'react-redux';
import { getPlaybackState } from 'react-native-track-player/lib/src/trackPlayer';
import { getPlayerState } from '../store/player';
import colors from '../utils/colors';
import AppLink from './AppLink';
import { useProgress } from 'react-native-track-player';
import formatDuration from 'format-duration';
import Slider from '@react-native-community/slider';
import useAudioController from '../../hooks/useAudioController';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PlayPauseBtn from './PlayPauseBtn';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PlayerController from './PlayerController';
import Loader from './Loader';
interface Props {
    visible: boolean;
    onRequestClose(): void
}

const formattedDuration = (duration = 0) => {
    return formatDuration(duration, {
        leading: true
    })
};

const AudioPlayer: FC<Props> = ({ visible, onRequestClose }) => {
    const { onGoingAudio  } = useSelector(getPlayerState)
    const {skipTo, onPreviousPress, togglePlayPause, isPlaying, isBusy, onNextPress} = useAudioController()
    //dynamic image source 
    const source = onGoingAudio?.poster ? { uri: onGoingAudio.poster.url } : require('../../assets/images/music.jpg')
    //audio progress from react-native-track-player
    const { duration, position } = useProgress()
    const { seekTO } = useAudioController()
    return <AppModal
        animation
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.container} >
            <Image source={source} style={styles.poster} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{onGoingAudio?.title}</Text>
                {/* AppLink : Later can pass onPress to open profile */}
                <AppLink title={onGoingAudio?.owner.name || ""} />
                <View style={styles.durationContainer}>
                    <Text style={styles.duration}>{formatDuration(position * 1000)}</Text>
                    <Text style={styles.duration}>{formatDuration(duration * 1000)}</Text>
                </View>
                <Slider
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor={colors.CONTRAST}
                    maximumTrackTintColor={colors.INACTIVE_CONTRAST}
                    value={position}
                    onSlidingComplete={(value) => seekTO(value)}
                />
                <View style={styles.control}>
                    {/* previous */}
                    <PlayerController onPress={onPreviousPress} ignoreContainer={true} >
                        <AntDesign name='stepbackward' size={24} color={colors.CONTRAST} />
                    </PlayerController>
                    {/* go back 5 sec */}
                    <PlayerController onPress={()=> skipTo(-5)} ignoreContainer={true}>
                        <FontAwesome name='rotate-left' size={20} color={colors.CONTRAST} />
                    </PlayerController>
                    {/* play and pause */}
                    <PlayerController>
                       {isBusy ? <Loader color={colors.PRIMARY} />:<PlayPauseBtn playing={isPlaying} onPress={togglePlayPause} color={colors.PRIMARY} /> }
                    </PlayerController>
                    {/* skip forward 5 sec */}
                    <PlayerController ignoreContainer={true} onPress={()=> skipTo(5)}  >
                        <FontAwesome name='rotate-right' size={20} color={colors.CONTRAST} />
                    </PlayerController>
                    {/* next */}
                    <PlayerController onPress={onNextPress} ignoreContainer={true}>
                        <AntDesign name='stepforward' size={24} color={colors.CONTRAST} />
                    </PlayerController>
                </View>
            </View>
        </View>
    </AppModal>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.OVERLAY
    },
    poster: {
        width: 200,
        height: 200,
        borderRadius: 10
    },
    contentContainer: {
        width: '100%',
        flex: 1,
        marginTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.CONTRAST
    },
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    duration: {
        color: colors.CONTRAST
    },
    control: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
});

export default AudioPlayer;