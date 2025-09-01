import { FC, ReactNode } from 'react'
import {  StyleSheet, Pressable, Text } from 'react-native'
import colors from '../../utils/colors';
import Loader from '../../ui/Loader';


interface Props{
    title: string | ReactNode;
    onPress?: ()=>void,
    busy?: boolean,
    borderRadius?: number
}
const AppButton:FC<Props> = props => {
  return (
    <Pressable 
        onPress={props.onPress} 
        style= {[styles.container,{
            borderRadius: props.borderRadius || 25
        }]}
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
     
    },
    title: {
        color: 'white',
        fontSize: 18
    }
});

export default AppButton;