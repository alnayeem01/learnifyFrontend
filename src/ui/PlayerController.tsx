import { FC, ReactNode } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import colors from '../utils/colors';


interface Props {
    size?: number;
    children: ReactNode;
    ignoreContainer ?:  boolean,
    onPress?(): void
}
const PlayerController: FC<Props> = ({size = 45, children, onPress,ignoreContainer}) => {
    return (
        <Pressable
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ignoreContainer ? 'transparent' : colors.CONTRAST
            }}
            onPress={onPress}
        >
            {children}
        </Pressable>
    )
};

const styles = StyleSheet.create({
    container: {}
});

export default PlayerController;