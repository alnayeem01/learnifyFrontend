import { FC } from 'react'
import { View, StyleSheet, FlexStyle } from 'react-native'
import colors from '../utils/colors';


interface Props {
    size: number;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
const CircleUI: FC<Props> = ({ size, position }) => {
    let viewPosition: FlexStyle = {};

    switch (position) {
        case "top-left":
            viewPosition = {
                top: -size / 2,
                left: -size / 2,
            };
            break;
        case "top-right":
            viewPosition = {
                top: -size / 2,
                right: -size / 2,
            };
            break;
        case "bottom-right":
            viewPosition = {
                bottom: -size / 2,
                right: -size / 2,
            };
            break;
        case "bottom-left":
            viewPosition = {
                bottom: -size / 2,
                left: -size / 2,
            };
            break;
    }       
    return (
        <View
            style={{
                width: size,
                height: size,
                position: 'absolute',
                ...viewPosition
            }}>
            <View
                style={{
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: colors.SECONDARY,
                    opacity: 0.3,
                }}
            />

            <View
                style={{
                    width: 200 / 1.5,
                    height: 200 / 1.5,
                    borderRadius: 200 / 2,
                    backgroundColor: colors.SECONDARY,
                    opacity: 0.3,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -200 / 3 }, { translateY: -200 / 3 }],
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {}
});

export default CircleUI;