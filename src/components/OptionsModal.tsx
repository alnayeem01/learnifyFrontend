import {  JSX } from 'react'
import { View, StyleSheet } from 'react-native'
import BasicModalContainer from './ui/BasicModalContainer';


interface Props<T> {
    visible: boolean
    onRequestClose(): void
    options: any[]
    renderItem(item: T): JSX.Element
}
const OptionsModal = <T extends any>({ visible, onRequestClose, options, renderItem }: Props<T>) => {
    return (
        <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
            {options.map((item, index)=>{
                return  <View key={index}>{renderItem(item)}</View>     
            })}
        </BasicModalContainer>
    )
};

const styles = StyleSheet.create({
    container: {
    }
});

export default OptionsModal;