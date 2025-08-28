import TrackPlayer, {Event} from 'react-native-track-player';
import {getClient} from './api/client';

let timeOutId: ReturnType<typeof setTimeout>;
const debounce = (fun: Function, delay: number) => {
  return (...args: any) => {
    if (timeOutId) clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      fun.apply(null, args);
    }, delay);
  };
};

interface StaleAudio {
  audio: string;
  progress: string;
  date: Date;
}

const sendHistory = async (StaleAudio: StaleAudio) => {
  const client = await getClient();
  await client
    .post('/history', {
      ...StaleAudio,
    })
    .catch(err =>
      console.log('There was an error handling history backup', err),
    );
};

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
  TrackPlayer.addEventListener(Event.PlaybackProgressUpdated, async e => {
    const list = await TrackPlayer.getQueue(); // this will return the trackList
    const audio = list[e.track]; //destructure audio from there
    const staleAudio = {
       audio: audio.id,
        progress: e.position,
        date: new Date(Date.now()),
    }
    const debounceHistory = debounce(sendHistory, 100);
    debounceHistory(staleAudio);
  });
};

export default playBackService;
