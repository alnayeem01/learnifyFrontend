import { FC, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import colors from '../../utils/colors';


interface Props {
     delay : number,
    height : number
}
const AnimatedStroke: FC<Props> = ({delay,height }) => {
    // useShatedValue hook from react-native-reanimated
    const sharedValue = useSharedValue(5);
    //useAnimated hook from react-naitve-reanimated : Return the styled object
    const heightStyle = useAnimatedStyle(() => ({
        height: sharedValue.value
    }));

    //useEfffect to manipulate the height
    useEffect(() => {
        //passed the delay prop here 
        sharedValue.value = withDelay(delay, withRepeat(withTiming(height), -1, true))
    }, [])
    return (
        <View style={styles.strokeContainer}>
            <Animated.View style={[styles.stroke, heightStyle]} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
    },
    strokeContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 15,
    },
    stroke: {
        width: 4,
        backgroundColor: colors.CONTRAST,
    },
});

export default AnimatedStroke;