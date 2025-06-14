import { FC } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';
import { useNavigation } from '@react-navigation/native';


interface Props{
    title?: string
}
const AppHeader:FC<Props> = ({title}) => {
    // use navigation return an obejct of multiplw navigation utilistes, here we wil de-structure goBack and canGoBack from here. The goBack will take user to previous screen
    const {goBack, canGoBack} = useNavigation()

    // canGoBack return a stack of previous history in boolean if thre is no valeu this will restric the use of the header.
    if (!canGoBack()) return 
  return <View style={styles.container}>
    <Pressable onPress={goBack} >
        <AntDesign name='arrowleft' size={24} color={colors.CONTRAST} />
    </Pressable>
    <Text style={styles.title}>{title}</Text>
  </View>
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor : colors.OVERLAY,
        padding: 15
    },
    title: {
        color: colors.CONTRAST,
        fontSize: 18,
        marginLeft: 138
    }
});

export default AppHeader;