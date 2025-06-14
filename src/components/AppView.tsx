import { FC, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import MiniAudioPlayer from './MiniAudioPlayer';
import useAudioController from '../../hooks/useAudioController';


interface Props{
    children: ReactNode
}
const AppView:FC<Props> = ({children}) => {
    const {isReady} = useAudioController()
  return <View style={styles.container}>
    <View>
        {children}
    </View>
    {isReady ? <MiniAudioPlayer /> : null }
  </View>
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 62
    }
});

export default AppView;