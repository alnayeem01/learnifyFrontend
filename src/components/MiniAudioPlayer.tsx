import { FC, useState } from 'react'
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
import AudioPlayer from '../ui/AudioPlayer';
import CurrentAudioList from './CurrentAudioList';
import { useFetchIsFavourite } from '../../hooks/query';


interface Props {

}

export const MiniPlayerHeight = 60
const MiniAudioPlayer: FC<Props> = props => {
    const [playerVisibility, setPlayerVisibiilty] = useState(false);
    const [showCurrent, setShowCurrent] = useState(false);
    const { onGoingAudio } = useSelector(getPlayerState);
    const { isPlaying, togglePlayPause, isBusy } = useAudioController();

    const {data : isFav} = useFetchIsFavourite(onGoingAudio?.id ||'')
    console.log(isFav)

    // useProgress hook from react-native-track-player 
    const progress = useProgress()
    const source = onGoingAudio?.poster?.url ? { uri: onGoingAudio.poster?.url } : require('../../assets/images/music.jpg')

    const showPlayerModal = () => {
        setPlayerVisibiilty(true)
    };

    const closePlayerModal = () => {
        setPlayerVisibiilty(false)
    };
    const handleShowCurrent = () => {
        setShowCurrent(false)
    };
    const handleOnListOptionPress = () => {
        closePlayerModal();
        setShowCurrent(true)
    }
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
            }} />
            <View style={styles.container}>
                <View>
                    <Image source={source} style={styles.poster} />
                </View>
                <Pressable onPress={showPlayerModal} style={styles.contentContainer}>
                    <Text style={styles.title}>{onGoingAudio?.title}</Text>
                    <Text style={styles.owner}>{onGoingAudio?.owner.name}</Text>
                </Pressable>
                <Pressable style={{ paddingHorizontal: 10 }}>
                    {!isFav? <AntDesign name='hearto' size={24} color={colors.CONTRAST} />:<AntDesign name='heart' size={24} color={colors.CONTRAST} />}
                </Pressable>
                {!isBusy ?
                    <PlayPauseBtn
                        playing={isPlaying}
                        onPress={togglePlayPause}
                    /> :
                    <Loader />
                }
            </View>
            <AudioPlayer
                visible={playerVisibility}
                onRequestClose={closePlayerModal} onListOptionPress={handleOnListOptionPress}
            />
            <CurrentAudioList
                visible={showCurrent}
                onRequestClose={handleShowCurrent}
            />
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: MiniPlayerHeight,
        backgroundColor:'rgba(29, 13, 13, 0.8)',
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