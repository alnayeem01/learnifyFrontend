import { FC } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import colors from '../utils/colors';
import AppModal from './AppModal';


interface Props{
    header: string,
    visible: boolean,
    onRequestClose(): void
}
const AudioListModal:FC<Props> = ({header, visible, onRequestClose}) => {
  return <AppModal visible={visible} onRequestClose={onRequestClose} >
    <View style={styles.container}>

    </View>
    <Text style={styles.header}>{header}</Text>
  </AppModal>
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.CONTRAST
    }
});

export default AudioListModal;