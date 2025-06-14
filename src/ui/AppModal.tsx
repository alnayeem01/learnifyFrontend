import { FC, ReactNode, useEffect } from 'react'
import { View, StyleSheet, Modal, Pressable, Dimensions } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import colors from '../utils/colors';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


interface Props {
    children: ReactNode,
    visible : boolean,
    onRequestClose(): void,
    animation ?: boolean
};

const { height } = Dimensions.get('window');
const modalHeight = height - 150;

const AppModal: FC<Props> = ({ children, animation, onRequestClose, visible }) => {
    // Import all gesture-related utilities from react-native-gesture-handler

    // GestureHandlerRootView is required to wrap all gesture components for proper handling

    // 'gesture' must be defined and passed here to detect swipe-down gestures to close modal

    // Pressable acts as a backdrop; can be extended to close modal when pressed

    // GestureDetector wraps the modal content and listens for gestures (e.g., swipe down)

    // Animated.View holds the modal content and allows animation based on gesture updates
    const translateY = useSharedValue(modalHeight);
    const translateStyle = useAnimatedStyle(()=>({
        transform: [{translateY: translateY.value}]
    }))
    const gesture = Gesture.Pan().onUpdate((e)=>{
        if(e.absoluteY <= 0) return;
        translateY.value = e.translationY
    }).onFinalize((e)=>{
        if(e.translationY <= modalHeight/2) translateY.value = 0 
        else translateY.value = modalHeight
        // here we will close the modal
        /// runOnJS : here to pass js code in native funcion we have to use runOnJS function from gestureHandler
        runOnJS(onRequestClose)()
    });
    useEffect(()=>{
        if(visible)
        translateY.value = withTiming(0, {duration: animation ? 200 : 0 })
    }, [visible, animation]);
            //transparent : it makes things underneath modal visible
    return <Modal onRequestClose={onRequestClose} transparent visible={visible}>
        <GestureHandlerRootView>
            {/* This pressable works as the backdrop for closing */}
            <Pressable onResponderEnd={onRequestClose} style={styles.backdrop} />
            {/* Modal : this view will contaisn actual contect of the modal  */}
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.modal, translateStyle]} >
                    {children}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    </Modal>
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.INACTIVE_CONTRAST
    },
    modal: {
        backgroundColor: colors.PRIMARY,
        height: modalHeight,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    }
});

export default AppModal;