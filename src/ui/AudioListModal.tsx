import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../utils/colors';
import AppModal from './AppModal';
import { AudioData } from '../@types/audio';
import { FlatList } from 'react-native-gesture-handler';
import AudioListItem from '../components/ui/AudioListItem';


interface Props{
    data: AudioData[]
    header: string,
    visible: boolean,
    onRequestClose(): void
}
const AudioListModal:FC<Props> = ({header,data, visible, onRequestClose}) => {
  return <AppModal visible={visible} onRequestClose={onRequestClose} >
    <View style={styles.container}>
    <Text style={styles.header}>{header}</Text>
    <FlatList 
        data={data}
        keyExtractor={({id})=> id}
        renderItem={({item})=>{
            return(
                <AudioListItem audio={item} />
            )
        }}
    />
    </View>
  </AppModal>
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.CONTRAST,
        paddingVertical: 10
    }
});

export default AudioListModal;