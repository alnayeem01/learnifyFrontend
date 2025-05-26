import { FC } from 'react'
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native'
import colors from '../utils/colors';



interface Props{
    progress : number
    style?: StyleProp<ViewStyle>
}
const Progress:FC<Props> = ({progress, style}) => {
  return <>
    <Text style={styles.title}>%</Text>
    <View style={[styles.progressBar, {width: `${progress}%`}, style]} />
  </>
};

const styles = StyleSheet.create({
    progressBar: {
        height: 10,
        backgroundColor: colors.CONTRAST,
        borderRadius : 5
    },
    title:{
        color:  colors.CONTRAST,
        paddingVertical: 2,
        alignSelf: 'flex-end'
    }
});

export default Progress;