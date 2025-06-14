
import TrackPlayer, { State, Track, usePlaybackState } from "react-native-track-player"
import { AudioData } from "../src/@types/audio"
import { useDispatch, useSelector } from "react-redux";
import { getPlayerState, updateOnGoingAudio, updateOnGoingList } from "../src/store/player";
import deepEqual from "deep-equal";

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
    const isReady = playbackState !== State.None
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
    //by returning from an object it can be used by destructuring
    return { onAudioPress }
};

export default useAudioController;