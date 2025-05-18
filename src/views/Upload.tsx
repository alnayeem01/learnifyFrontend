import { FC, useState } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native'

import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FileSelector from '../components/FileSelector';
import AppButton from '../components/ui/AppButton';
import CategorySelector from '../components/CategorySelector';
import { categories } from '../utils/Categories';


interface Props {

}
const Upload: FC<Props> = props => {
  const [showCategoryModal, SetShowCategoryModal] = useState(false)
  const [audioInfo, setAudioInfo]  = useState({
    category: '',
    
  })
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector 
          icon=<MaterialCommunityIcons name='image-outline' size={36} color={colors.SECONDARY} /> 
          btnTitle={'Select Poster'} 
        />
        <FileSelector
          icon=<MaterialIcons
           name='audio-file' size={36} color={colors.SECONDARY} />
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
        />
      </View>

      {/* form  */}
      <View style={styles.formContainer}>
         <TextInput 
          placeholder='Title' 
          style={styles.input} 
          placeholderTextColor={colors.INACTIVE_CONTRAST}
        />
        <Pressable onPress={()=> SetShowCategoryModal(true)} style={styles.categorySelector}>
          <Text style={styles.categoryTitle}> Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput 
          placeholder='About' 
          style={styles.input} 
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          multiline
        />
        
        {/* This is the custom we made usign react native modal */}
        <CategorySelector 
          title='Category' 
          visible={showCategoryModal} 
          onRequestClose={()=>{
            SetShowCategoryModal(false)
          }}
          data={categories}
          renderItem={(item)=>{
            return <Text style={styles.category}>{item}</Text>
          }}
          onSelect = {(item) =>{
            setAudioInfo({category: item})
          }}
        />
        <View style={{marginBottom: 20}} />
        <AppButton title="Submit" borderRadius={7} />
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
  
    textAlignVertical: "top"
  },
  category:{
    padding: 10,
    color: colors.PRIMARY
  },
  categorySelector:{
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 20
  },
  categoryTitle:{
    color: colors.CONTRAST
  },
  selectedCategory:{
    color: colors.SECONDARY,
      marginLeft: 5,
      fontStyle: 'italic'
  }
});

export default Upload;