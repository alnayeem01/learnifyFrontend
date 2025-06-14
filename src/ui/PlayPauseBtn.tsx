import { FC } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';


interface Props {
    color?: string;
    playing?: boolean
    onPress?(): void
}
const PlayPauseBtn: FC<Props> = ({color = colors.CONTRAST, playing, onPress}) => {
    return <View style={styles.button}>
        <Pressable style={{ paddingHorizontal: 10 }} onPress={onPress}>
            {playing ?  
                <AntDesign name='pause' size={24} color={color} /> : 
                <AntDesign name='caretright' size={24} color={color} />
            } 
            
        </Pressable>
    </View>
};

const styles = StyleSheet.create({
    button: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default PlayPauseBtn;