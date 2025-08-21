import TrackPlayer, {Event} from 'react-native-track-player';
import { getClient } from './api/client';


//This is where we can trigger control event when app  is on background
const playBackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async (e) => {
    const client = await getClient()
    const list = await TrackPlayer.getQueue(); // this will return the trackList 
    const audio = list[e.track]; //destructure audio from there 
    await client.post('/history',{
      audio: audio.id ,
      progress: e.position ,
      date: new Date(Date.now())
    }).catch(err=> console.log('There was an error handling history backup',err))
   
  });
};

export default playBackService;
