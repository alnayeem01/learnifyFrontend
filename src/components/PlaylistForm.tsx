import React, { FC, useState } from 'react'
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native'
import BasicModalContainer from './ui/BasicModalContainer';
import colors from '../utils/colors';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export interface PlayListInfo{
    title: string;
    private: boolean
}

interface Props{
    onRequestClose (): void;
    visible: boolean;
    onSubmit(value: PlayListInfo) : void
}
const PlaylistForm:FC<Props> = ({onRequestClose, onSubmit, visible}) => {
    const [playListInfo, setPlayListInfo] = useState({
        title: "",
        private: false
    })

    const handleSubmit = ()=>{
        onSubmit(playListInfo);
        onRequestClose()
        handleClose()
    };

    const handleClose =()=>{
        setPlayListInfo({ title: "",private: false});
        onRequestClose()
    };

  return(
    <BasicModalContainer visible={visible} onRequestClose ={onRequestClose}>
        <View>
            <Text style={styles.heading}>Create New Playlist</Text>
            <TextInput 
                placeholder='Title' 
                style={styles.input}
                onChangeText={(text)=>{
                    setPlayListInfo({...playListInfo, title: text})
                }}
                value = {playListInfo.title} 
                />
            <Pressable 
                onPress={()=>{
                     setPlayListInfo({...playListInfo, private: !playListInfo.private})
                }}
                style={styles.privateSelector}>
                {playListInfo.private  ? (
                <MaterialComIcons
                  name="radiobox-marked"
                  color={colors.PRIMARY}
                />
              ) : (
                <MaterialComIcons
                  name="radiobox-blank"
                  color={colors.PRIMARY}
                />
              )}
                <Text style={styles.PrivateLabel}>Private</Text>
            </Pressable>
             <Pressable onPress={handleSubmit} style={styles.submitBtn}>
                <Text style={styles.PrivateLabel}>Submit</Text>
            </Pressable>
        </View>
    </BasicModalContainer>
  ) 
};

const styles = StyleSheet.create({
    input: {
        height: 45,
        padding:10,
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        color: colors.PRIMARY
    },
    privateSelector:{
         height: 45,
         alignItems: 'center',
         flexDirection: 'row',
         gap: 10
    },
    PrivateLabel:{
        color: colors.PRIMARY,
    },
    submitBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 45,
        borderRadius: 7
    },
    heading:{
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default PlaylistForm;