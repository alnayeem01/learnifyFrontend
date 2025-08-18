import React, { FC, useState } from 'react'
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../utils/colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
    containerStyle?: StyleProp<ViewStyle>
}
//speed rates
const speedRates = ['0.25', '0.5', '0.75', '1', '1.25', '1.5', '1.75', '2'];
const selectorSize = 40;
const PlayBackRateSelector: FC<Props> = ({containerStyle}) => {
    const [show, setShow] = useState(true);
    const width = useSharedValue(0);

    const handlePress = ()=>{
        setShow(false);
        width.value = withTiming(selectorSize * speedRates.length, {
            duration : 70
        })
    };

    const widthStyle = useAnimatedStyle(()=>({
        width: width.value,
    }));
    
    return <View style={[styles.container, containerStyle]}>
        {show ?
            <Pressable onPress={handlePress}>
                <FontAwesome5 name='running' color={colors.CONTRAST} size={24} />
            </Pressable> : null
        }
        <Animated.View style={[styles.button, widthStyle]}>
            
        </Animated.View>
    </View>
};

const styles = StyleSheet.create({
    container: {

    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.OVERLAY,
        overflow: 'hidden'
    }
});

export default PlayBackRateSelector;