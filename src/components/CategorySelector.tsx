import { JSX, useState } from 'react'
import { StyleSheet, Modal, Pressable, View, Text, ScrollView } from 'react-native'
import colors from '../utils/colors';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props<T> {
    data: T[]
    visible?: boolean
    title: string
    renderItem(item: T): JSX.Element
    onSelect(item: T,index: number): void 
    onRequestClose?(): void
}
const CategorySelector = <T extends any>({ visible = false, title, data, renderItem,onSelect, onRequestClose  }: Props<T>) => {

    // keeps track of selected index 
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const handlePress = (item: T, index: number) => {
        setSelectedIndex(index);
        onSelect(item, index);
        onRequestClose && onRequestClose()
    }

    return <Modal onRequestClose={onRequestClose} visible={visible} transparent>
        <Pressable onPress={onRequestClose} style={styles.backdrop} />
        <View style={styles.modalContainer}>
            <View style={styles.modal}>
                <Text style={styles.title}>{title}</Text>
                <ScrollView>
                    {data.map((item, index) => {
                        return (
                            <Pressable onPress={() => handlePress(item, index)} key={index} style={styles.selectorContainer} >
                                {/* if box selected than it shows first icon otherwise second icon */}
                                {selectedIndex === index ? 
                                <MaterialComIcons name='radiobox-marked' color={colors.SECONDARY} /> :
                                <MaterialComIcons name='radiobox-blank' color={colors.SECONDARY} />
                                }
                                {renderItem(item)}
                            </Pressable>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    </Modal>
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.INACTIVE_CONTRAST,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 1
    },
    modal: {
        width: "90%",
        maxHeight: '50%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: colors.CONTRAST
    },
    title: {
        fontSize: 18,
        fontWeight: "700"
    },
    selectorContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }
});

export default CategorySelector;