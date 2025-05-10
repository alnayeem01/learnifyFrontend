import { FC } from 'react'
import { View, StyleSheet, Text, TextInputProps, StyleProp, ViewStyle } from 'react-native'
import AppInput from '../ui/AppInput';
import colors from '../utils/colors';


interface Props {
    errorMsg?: string,
    label?:string,
    placeholder?: string,
    keyboardType?: TextInputProps["keyboardType"],
    containerStyle ?: StyleProp<ViewStyle>
    onChange ?: (text:string)=>void
    secureTextEntry?: TextInputProps["secureTextEntry"],
    values: string
}
const AuthInputField:FC<Props> = ({label, placeholder,keyboardType, containerStyle, secureTextEntry, onChange,errorMsg, values}) => {
  return (
    //TO pass custom styling later
    <View style= {[styles.container, containerStyle]}> 
        <View style={styles.labelContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
        </View>
        <AppInput
            placeholder= {placeholder}
            keyboardType={keyboardType} //To pass prop form child we are exteidng the interfce type for This components
            secureTextEntry ={secureTextEntry}
            onChangeText={onChange}
            value= {values}
        />
    </View>
  )
};

const styles = StyleSheet.create({
    container :{

    }
    ,
    label: {
        color: colors.CONTRAST,
        marginVertical: 10,
    },
    errorMsg: {
        color:colors.ERROR
    },
    labelContainer:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent: 'space-between',
        padding: 5
    }
});

export default AuthInputField;