import { FC, ReactNode } from 'react'
import { View, StyleSheet, Pressable, Text, StyleProp, ViewStyle } from 'react-native'
import colors from '../utils/colors';


interface Props {
    icon?: ReactNode,
    btnTitle?: string,
    style?: StyleProp<ViewStyle>
}
const FileSelector: FC<Props> = ({ icon, btnTitle, style }) => {
    return (
        <Pressable style={{alignItems: "center"}}>
            <View style={[styles.btnContainer, style]}>
                {icon}
            </View>
            <Text style={styles.btnTitle}>{btnTitle}</Text>
        </Pressable>

    )
};

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: colors.SECONDARY,
        borderRadius: 7
    },
    btnTitle: {
        color: colors.CONTRAST,
        marginTop: 7,
        textAlign: "center"
    }
});

export default FileSelector;