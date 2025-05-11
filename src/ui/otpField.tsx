import { FC } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import colors from '../utils/colors';


interface Props extends TextInputProps{
}
const OtpField: FC<Props> = props => {
    return (
        <TextInput 
            {...props} 
            style={[styles.input, props.style ]} 
            placeholder= "o"
            placeholderTextColor={colors.INACTIVE_CONTRAST}
        />
    )
};

const styles = StyleSheet.create({
    input: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: colors.CONTRAST,
        borderWidth: 2,
        textAlign: "center",
        color: colors.CONTRAST,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,  
    }

});

export default OtpField;