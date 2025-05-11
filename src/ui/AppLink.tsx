import { FC } from 'react'
import { StyleSheet, Pressable, Text } from 'react-native'
import colors from '../utils/colors';


interface Props {
    title: string
    onPress?(): void
};
const AppLink: FC<Props> = props => {
    return (
    <Pressable onPress={props.onPress}>
        <Text  style={styles.title}>{props.title}</Text>
    </Pressable>)

};

const styles = StyleSheet.create({
    title: {
        color: colors.SECONDARY
    }
});

export default AppLink;