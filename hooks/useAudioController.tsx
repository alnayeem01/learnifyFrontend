
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, State, Track, usePlaybackState, useProgress } from "react-native-track-player"
import { AudioData } from "../src/@types/audio"
import { useDispatch, useSelector } from "react-redux";
import { getPlayerState, updateOnGoingAudio, updateOnGoingList } from "../src/store/player";
import deepEqual from "deep-equal";
import { useEffect } from "react";

let ready=false;

const updateQueue = async (data: AudioData[]) => {
    //passing the Track object required by react native Track Player 
    const localImage = require('../assets/images/mic.png')
    //there is an error when pasing local 
    const lists: Track[] = data.map(item => {
        return {
            id: item.id,
            url: item.file,
            artwork: item?.poster?.url || localImage,
            artist: item.owner.name,
            title: item.title,
            genre: item.category,
            isLiveStream: true
        }
    });
    //now here we will add these track to react-native-track-player
    //spread operator to spread the lists object here inside the array 
    // use trackPlayer to play the audio
    await TrackPlayer.add([...lists]);
}

const useAudioController = () => {
    //usePlaybackState hook from react native player 
    const { state: playbackState } = usePlaybackState() as { state?: State };
    const { onGoingAudio, onGoingList } = useSelector(getPlayerState); //from redux store
    const dispatch = useDispatch();
    const isReady = playbackState !== State.None;
    const isPlaying = playbackState === State.Playing;
    const isPaused = playbackState === State.Paused;
    const isBusy = playbackState === State.Buffering || playbackState === State.Loading
    const onAudioPress = async (item: AudioData, data: AudioData[]) => {

        if (!isReady) {
            // when playing audio for tha first time : Play Audio
            await updateQueue(data);
            //extract the id of the item that shold be played for audioData array
            const index = data.findIndex((audio) => audio.id === item.id);
            // use skip method form track-player to jump to this track than play the track 
            await TrackPlayer.skip(index);
            await TrackPlayer.play();
            //update the state onGoingAudio
            dispatch(updateOnGoingAudio(item));
            // passed the audioData array 
            return dispatch(updateOnGoingList(data))
        };
        if (playbackState === State.Playing && onGoingAudio?.id === item.id) {
            //same audio is already playing : HandlePause
            return await TrackPlayer.pause()
        };

        if (playbackState === State.Paused && onGoingAudio?.id === item.id) {
            //same audio no need to load : resume
            return await TrackPlayer.play()
        };

        if (onGoingAudio?.id !== item.id) {
            //this will compare the data list with our redux store list
            const fromSameList = deepEqual(onGoingList, data);
            await TrackPlayer.pause()
            // finding index of the audio
            const index = data.findIndex((audio) => audio.id === item.id);
            if (!fromSameList) {
                // playing new audio from diffrent list
                await TrackPlayer.reset();
                await updateQueue(data);
                dispatch(updateOnGoingList(data))
            }
            await TrackPlayer.skip(index);
            await TrackPlayer.play()
            dispatch(updateOnGoingAudio(item))
        }
    };

    /**
     * Toggles the playback state of the audio player.
     *
     * If audio is currently playing, this function pauses playback.
     * If audio is currently paused, this function resumes playback.
     *
     * @async
     * @returns {Promise<void>} A promise that resolves when the playback state has been toggled.
     */
    const togglePlayPause = async () => {
        if (isPlaying) await TrackPlayer.pause();
        if (isPaused) await TrackPlayer.play()
    };

    //seek
    const seekTO = async (position: number) => {
        await TrackPlayer.seekTo(position)
    };

    //skip
    const skipTo = async (sec: number) => {
        const currentPosition = await TrackPlayer.getProgress().then((progress) => progress.position)
        await TrackPlayer.seekTo(currentPosition + sec)
    };

    //next button
    const onNextPress = async () => {
        const currentList = await TrackPlayer.getQueue();
        const currentIndex = await TrackPlayer.getActiveTrackIndex()
        // return if: index ==last audio or null or undefined
        if (currentIndex === null || currentIndex === undefined || currentIndex >= currentList.length - 1) return;
        await TrackPlayer.skipToNext()
        //Update OnGoingAudio
        dispatch(updateOnGoingAudio(onGoingList[currentIndex + 1]))
    };
    //next button
    const onPreviousPress = async () => {
        const currentList = await TrackPlayer.getQueue();
        const currentIndex = await TrackPlayer.getActiveTrackIndex()
        // return if: index ==first audio or null or undefined
        if (currentIndex === undefined || currentIndex <= 0) return;
        await TrackPlayer.skipToPrevious()
        //Update OnGoingAudio
        dispatch(updateOnGoingAudio(onGoingList[currentIndex - 1]))
    }
    // thsi function will take reae as param and using trackplayer.setRate() update the rate 
    const setPlaybackRate = async (rate: number) => {
        await TrackPlayer.setRate(rate)
    };

    //track  Player 
    useEffect(() => {
        /**
         * Initializes the TrackPlayer instance asynchronously.
         * 
         * This function sets up the audio player by calling `TrackPlayer.setupPlayer()`.
         * It should be called before attempting to use any playback features to ensure
         * the player is properly initialized and ready for use.
         *
         * @returns {Promise<void>} A promise that resolves when the player is set up.
         */
        const setupPlayer = async () => {
            if(ready) return;
            await TrackPlayer.setupPlayer();
            //BackGround Playing: this is the config that allows player to continue plaaying in androi devices
            await TrackPlayer.updateOptions({
                //this will enforce callign progressUpatedEvent every 10 second
                progressUpdateEventInterval: 10,
                android: {
                    // this will stop the playing upon removal of app from background
                    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
                },
                // this are permission of thing that audioPlayers in notification bar can do 
                capabilities:[
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
                compactCapabilities:[
                     Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ]
            })
        };
        setupPlayer();
        ready=true
    }, []);
    

    //by returning from an object it can be used by destructuring
    return {
        onAudioPress,
        isReady,
        isPlaying,
        isPaused,
        togglePlayPause,
        isBusy,
        seekTO,
        skipTo,
        onNextPress,
        onPreviousPress,
        setPlaybackRate
    }

};



export default useAudioController;