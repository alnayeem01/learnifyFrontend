import { FC, ReactNode } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import CircleUI from '../../ui/CircleUI';
import colors from '../../utils/colors';


interface Props {
    title: string;
    subTitle: string;
    children?: ReactNode;
}
const AuthFormContainer: FC<Props> = ({ title, subTitle, children }) => {
    return (
        <View style={styles.authFormContainer}>
            <CircleUI size={200} position={'top-left'} /><CircleUI size={100} position={'top-right'} /><CircleUI size={100} position={'bottom-left'} /><CircleUI size={200 / 2} position={'bottom-right'} /><View style={styles.headingContainer}>
                <Image source={require('../../assets/images/mic.png')} />
                <Text style={styles.headinText}>{title}</Text>
                <Text style={styles.headinTextTitle}>{subTitle}</Text>
            </View>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    authFormContainer: {
        flex: 1,
        backgroundColor: colors.PRIMARY,
        alignItems: "center",
        justifyContent: "center"
    },
    headingContainer: {
        alignItems: "center",
        gap: 10
    },
    headinText: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.SECONDARY,
      
    },
    headinTextTitle: {
        fontSize: 14,
        color: colors.CONTRAST,
          marginBottom: 30
    }
});

export default AuthFormContainer;