import { FC, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import colors from '../utils/colors';
import AnimatedStroke from '../components/ui/AnimatedStroke';


interface Props {
    visible: boolean
}
const PlayAnimation: FC<Props> = ({ visible }) => {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <AnimatedStroke delay={0} height={15} />
            <AnimatedStroke delay={100} height={20} />
            <AnimatedStroke delay={150} height={15} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.OVERLAY,
        flexDirection:'row',
        gap: 5
    },

});

export default PlayAnimation;