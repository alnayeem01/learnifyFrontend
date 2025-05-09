import { FC } from 'react'
import { View, StyleSheet, Text, TextInputProps, StyleProp, ViewStyle } from 'react-native'
import AppInput from '../ui/AppInput';
import colors from '../utils/colors';


interface Props {
    label?:string,
    placeholder?: string,
    keyboardType?: TextInputProps["keyboardType"],
    containerStyle ?: StyleProp<ViewStyle>
    onChange ?: (text:string)=>void
    secureTextEntry?: TextInputProps["secureTextEntry"]
}
const AuthInputField:FC<Props> = ({label, placeholder,keyboardType, containerStyle, secureTextEntry, onChange}) => {
  return (
    //TO pass custom styling later
    <View style= {[styles.container, containerStyle]}> 
        <Text style={styles.label}>{label}</Text>
        <AppInput
            placeholder= {placeholder}
            keyboardType={keyboardType} //To pass prop form child we are exteidng the interfce type for This components
            secureTextEntry ={secureTextEntry}
            onChangeText={onChange}
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
    marginVertical: 20,
  }
});

export default AuthInputField;