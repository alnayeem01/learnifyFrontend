
import TrackPlayer, { State, Track, usePlaybackState } from "react-native-track-player"
import { AudioData } from "../src/@types/audio"
import { useDispatch, useSelector } from "react-redux";
import { getPlayerState, updateOnGoingAudio } from "../src/store/player";

const updateQueue = async (data: AudioData []) => {
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
     const {state: playbackState} = usePlaybackState() as {state?: State};
     const { onGoingAudio} = useSelector(getPlayerState); //from redux store
     const dispatch = useDispatch();

    const onAudioPress = async (item: AudioData, data: AudioData[]) => {

        if(playbackState !== State.None){
            // when playing audio for tha first time : Play Audio
            await updateQueue(data);
            //extract the id of the item that shold be played for audioData array
            const index = data.findIndex((audio)=> audio.id === item.id);
            // use skip method form track-player to jump to this track than play the track 
            await TrackPlayer.skip(index);
            await TrackPlayer.play();
            //update the state onGoingAudio
            dispatch(updateOnGoingAudio(item))
        };
        if(playbackState === State.Playing && onGoingAudio?.id === item.id){
            //same audio is already playing : HandlePause
            await TrackPlayer.pause()
        };

         if(playbackState === State.Paused && onGoingAudio?.id === item.id){
            //same audio no need to load : resume
            await TrackPlayer.play()
        };
        
    };
    //by returning from an object nac be used by destructuring
    return {onAudioPress}
};

export default useAudioController;