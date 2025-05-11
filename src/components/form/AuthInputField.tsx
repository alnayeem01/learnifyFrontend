import { FC, ReactNode, useEffect } from 'react'
import { View, StyleSheet, Text, TextInputProps, StyleProp, ViewStyle, Pressable } from 'react-native'
import AppInput from '../../ui/AppInput';
import colors from '../../utils/colors';
import { useFormikContext } from 'formik';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';


interface Props {
    name: string,
    label?: string,
    placeholder?: string,
    keyboardType?: TextInputProps["keyboardType"],
    containerStyle?: StyleProp<ViewStyle>
    onChange?: (text: string) => void
    secureTextEntry?: TextInputProps["secureTextEntry"], 
    rightIcon?: ReactNode,
    onRightIconPress?:()=> void
}
const AuthInputField: FC<Props> = ({ label, placeholder, keyboardType, containerStyle, secureTextEntry, name, rightIcon,onRightIconPress }) => {

    const inputStyleValue = useSharedValue(0); // state from reanimated
    //FormikContext
    const { handleChange, values, errors, handleBlur, touched } = useFormikContext<{ [key: string]: string }>();
    const errorMsg = touched[name] && errors[name] ? errors[name] : ""

    //funciton for shaking animation 
    const shakeUI = ()=>{
        inputStyleValue.value = withSequence(
            withTiming(-10, {duration : 50}),
            withSpring(0, {
                damping: 8,
                mass: 0.5,
                stiffness: 1000,
                restDisplacementThreshold: 0.1
            })
        );
    };

    //This effct will run teh shakeUI function when-ever there is an error 
    useEffect(()=>{
        if(errorMsg) shakeUI()
    }, [errorMsg])

    const inputStyle = useAnimatedStyle(()=>{
        return{
            transform : [{ 
                translateX: inputStyleValue.value 
            }]
        }
    })
    return (
        //TO pass custom styling later
        <Animated.View style={[containerStyle, inputStyle]}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <View>
                <AppInput
                placeholder={placeholder}
                keyboardType={keyboardType} //To pass prop form child we are exteidng the interfce type for This components
                secureTextEntry={secureTextEntry}
                onChangeText={handleChange(name)}
                value={values[name]}
                onBlur={handleBlur(name)}
                style={styles.marginBottom}
            />
            {
                rightIcon?(
                    <Pressable onPress={onRightIconPress} style= {styles.rightIcon}>
                        {rightIcon}
                    </Pressable>
                ): null
            }
            </View>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    label: {
        color: colors.CONTRAST,
        marginVertical: 10,
    },
    errorMsg: {
        color: colors.ERROR
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        padding: 5
    },
    marginBottom:{
        marginBottom:10
    },
    rightIcon:{
        width: 45,
        height: 45,
        position: "absolute",
        top: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default AuthInputField;