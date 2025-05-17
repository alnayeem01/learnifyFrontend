import { FC, ReactNode } from 'react'
import {  StyleSheet, Pressable, Text } from 'react-native'
import colors from '../../utils/colors';
import Loader from '../../ui/Loader';


interface Props{
    title: string | ReactNode;
    onPress?: ()=>void,
    busy?: boolean
}
const AppButton:FC<Props> = props => {
  return (
    <Pressable 
        onPress={props.onPress} 
        style= {styles.container}
    >
        {!props.busy ? <Text>{props.title}</Text> : <Loader />}
    </Pressable>
  )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 45,
        backgroundColor: colors.SECONDARY,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    title: {
        color: colors.CONTRAST,
        fontSize: 18
    }
});

export default AppButton;