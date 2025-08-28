import { FC, ReactNode } from 'react'
import { View, StyleSheet, Pressable, Text, StyleProp, ViewStyle } from 'react-native'
import {DocumentPickerOptions, DocumentPickerResponse, pick } from '@react-native-documents/picker'
import colors from '../utils/colors';


interface Props {
    icon?: ReactNode,
    btnTitle?: string,
    style?: StyleProp<ViewStyle>
    onSelect (file: DocumentPickerResponse): void  
    options : DocumentPickerOptions // the type of doc user will be able to upload 
}
const FileSelector: FC<Props> = ({ icon, btnTitle, style, onSelect, options }) => {

    //For picking doc from user device 
    const handleDocumentSelect = async () => {
        try {
            const doc = await pick(options);
            // as the selected file will be inside an array
            const file = doc[0]
            onSelect(file)
        } catch (e: any) {
            if (e?.code === 'DOCUMENT_PICKER_CANCELED') {
                // User cancelled the picker, do nothing
                return;
            }
            
        }
    };
    return (
        <Pressable onPress={handleDocumentSelect} style={{alignItems: "center"}}>
            <View style={[styles.btnContainer, style]}>
                {icon}
            </View>
            <Text style={styles.btnTitle}>{btnTitle}</Text>
        </Pressable>

    )
};

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 70,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: colors.SECONDARY,
        borderRadius: 7
    },
    btnTitle: {
        color: colors.CONTRAST,
        marginTop: 7,
        textAlign: "center"
    }
});

export default FileSelector;