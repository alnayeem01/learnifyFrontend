import { FC, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../utils/colors';


interface Props {
    color?: string
}
const Loader: FC<Props> = ({ color = colors.CONTRAST }) => {
    // 1. Create a shared value to hold the current rotation angle (already done).

    // 2. Set up a useAnimatedStyle hook that returns a rotation transform
    //    - It should apply `transform: [{ rotate: `${rotation}deg` }]`
    //    - Use the shared value to drive the rotation animation

    // 3. Trigger a continuous rotation animation (e.g., with withRepeat and withTiming or withSpring)
    //    - Start the animation in useEffect or directly in the component body
    //    - Make it loop infinitely for a loading spinner effect

    // 4. Apply the animated style to the component (e.g., a View or an Image)
    //    - This animated View will then rotate continuously using the style returned above

    const initialRotation = useSharedValue(0)

    const transform = useAnimatedStyle(() => {
        return {
            transform : [{rotate: `${initialRotation.value}deg`}]
        }
    })

    useEffect(()=>{
        initialRotation.value = withRepeat(withTiming(360), -1)
    })

    return (
        <Animated.View style={transform}>
            <AntDesign name={'loading1'} size={24} color={color} />
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container: {}
});

export default Loader;