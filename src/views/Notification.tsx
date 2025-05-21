import { FC, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Animated, { ColorSpace, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationState, updateNotification } from '../store/notificaton';
import colors from '../utils/colors';


interface Props {

}
const Notification: FC<Props> = props => {
    //get notification form redux store 
    const { message, type } = useSelector(getNotificationState)
    //the initail value before the animation 
    const height = useSharedValue(0);
    const dispatch = useDispatch()

    //This is where we manipulate the height using animation
    const heightStyle = useAnimatedStyle(() => {
        return {
            height: height.value
        }
    })

    let backgroundColor = colors.ERROR
    let textColor = colors.CONTRAST
    if (type === 'success') {
        backgroundColor = colors.SUCCESS;
        textColor = colors.PRIMARY
    }

    //using the useEffect to manipualte the height 
    useEffect(()=>{
        let timeoutId: ReturnType<typeof setTimeout>;
        const performAnimaition = ()=>{
            height.value = withTiming(45,{
                duration: 150
            });
            timeoutId = setTimeout(()=>{
                height.value = withTiming(0,{
                    duration: 30
                });
                // after notifioan is show for the durion we reset the state for notificaion states
                dispatch(updateNotification({message: " ", type: "error"}))
            }, 3000)
        }

        performAnimaition()
        
        return () => {
            clearTimeout(timeoutId);
        }
       
    }, [message])

    return (
        <Animated.View style={[styles.container, { backgroundColor: backgroundColor},heightStyle]}>
            <Text style={[styles.message, { color: textColor }]} >{message}</Text>
        </Animated.View>
    )
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    message: {
        fontSize: 18,
        alignItems: 'center'
    }
});

export default Notification;