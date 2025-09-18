import { FC, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import MiniAudioPlayer from './MiniAudioPlayer';
import useAudioController from '../hooks/useAudioController';
import PlaylistAudioModal from './ui/PlaylistAudioModal';


interface Props{
    children: ReactNode
}
const AppView:FC<Props> = ({children}) => {
    const {isReady} = useAudioController()
  return <View style={styles.container}>
    <View>
        {children}
    </View>
    {isReady ? <View style={styles.miniAudioPlayerContainer}><MiniAudioPlayer /></View> : null }
    <PlaylistAudioModal />
  </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    miniAudioPlayerContainer:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom:0,
    }
});

export default AppView;