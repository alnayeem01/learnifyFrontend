import { FC } from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'
import colors from '../utils/colors';


interface Props {
    title: string
    onPress?(): void,
    active?: boolean
};
const AppLink: FC<Props> = ({onPress,title,active=true})=> {
    return (
    <Pressable onPress={active? onPress : null}>
        <Text  style={[styles.title,{opacity: active? 1: 0.4}]}>{title}</Text>
    </Pressable>)

};

const styles = StyleSheet.create({
    title: {
        color: colors.SECONDARY
    }
});

export default AppLink;