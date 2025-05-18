import { FC } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native'

import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileSelector from '../components/FileSelector';


interface Props {

}
const Upload: FC<Props> = props => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector 
          icon=<MaterialCommunityIcons name='image-outline' size={36} color={colors.SECONDARY} /> 
          btnTitle={'Select Poster'} 
        />
        <FileSelector
          icon=<MaterialCommunityIcons name='image-outline' size={36} color={colors.SECONDARY} />
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
        />
      </View>

      {/* form  */}
      <View style={styles.formContainer}>
         <TextInput 
          placeholder='title' 
          style={styles.input} 
          placeholderTextColor={colors.INACTIVE_CONTRAST}
        />
        <TextInput 
          placeholder='About' 
          style={styles.input} 
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          multiline
        />
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  fileSelectorContainer: {
    flexDirection: "row",
    gap: 10
  },
  formContainer:{
    marginTop: 20
  },
  input:{
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    marginBottom: 20,
    textAlignVertical: "top"
  }
});

export default Upload;