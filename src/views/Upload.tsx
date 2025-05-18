import { FC, useState } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native'

import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FileSelector from '../components/FileSelector';
import AppButton from '../components/ui/AppButton';
import CategorySelector from '../components/CategorySelector';
import { categories } from '../utils/Categories';
import { DocumentPickerResponse, types } from '@react-native-documents/picker';
import * as yup from 'yup'
import client from '../api/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFromAsyncStorage, keys } from '../utils/asyncStorage';

interface FormFiels {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse; //from Document-Picker
  poster?: DocumentPickerResponse; //from Document-Picker
}

//default form value for useState audioInfo 
const defaultForm: FormFiels = {
  title: "",
  category: "",
  about: ""
}

//form validation usign yup
const audionInfoSchema = yup.object().shape({
  title: yup.string().trim().required("Title is Missing!"),
  category: yup.string().oneOf(categories, "Category is Missing!"),
  about: yup.string().trim().required("About is Missing!"),
  file: yup.object().shape({
    uri: yup.string().required("Audio file is Missing!"),
    name: yup.string().required("Auido file is Missing!"),
    type: yup.string().required("Auido file is Missing!"),
    size: yup.number().required("Auido file is Missing!"),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number()
  }),
})


interface Props { }

const Upload: FC<Props> = props => {
  const [showCategoryModal, SetShowCategoryModal] = useState(false)
  const [audioInfo, setAudioInfo] = useState({ ...defaultForm })

  // handle upload event 
  const handleUpload = async () => {
    try {
      //validation usign yup
      const finalData = await audionInfoSchema.validate(audioInfo);

      //beacause we have to send the file as formData type
      const formData = new FormData()
      formData.append('title', finalData.title)
      formData.append('about', finalData.about)
      formData.append('category', finalData.category)
      formData.append('file', {
        name: finalData.file.name,
        uri: finalData.file.uri,
        size: finalData.file.size,
      })
      // Because poster is optional 
      if (finalData.poster.uri) {
        formData.append('poster', {
          name: finalData.poster.name,
          uri: finalData.poster.uri,
          size: finalData.poster.size,
        })
      }

      const token = await getFromAsyncStorage(keys.Auth_TOKEN);
      console.log(token)
      if (!token) return
  
      const { data } = await client.post('/audio/create', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
          "Content-Type": "multipart/form-data"
        }
      })

      console.log('Bearer ' + token)
      console.log(data)
    } catch (e: any) {
      console.log('entered')
      if (e.response) {
        console.log(e.response.data); // Axios-specific error
      } else {
        console.log('Non-Axios error:', e.message || e);
      }
    }
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon=<MaterialCommunityIcons name='image-outline' size={36} color={colors.SECONDARY} />
          btnTitle={'Select Poster'}
          options={{ type: [types.images] }}
          onSelect={(file) => {
            setAudioInfo({ ...audioInfo, file })
          }}
        />
        <FileSelector
          icon=<MaterialIcons
            name='audio-file' size={36} color={colors.SECONDARY} />
          btnTitle="Select Audio"
          style={{ marginLeft: 20 }}
          options={{ type: [types.audio] }}
          onSelect={(file) => {
            setAudioInfo({ ...audioInfo, poster: file })
          }}
        />
      </View>

      {/* form  */}
      <View style={styles.formContainer}>
        <TextInput
          placeholder='Title'
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          onChangeText={(text) => {
            setAudioInfo({ ...audioInfo, title: text })
          }}
        />
        <Pressable onPress={() => SetShowCategoryModal(true)} style={styles.categorySelector}>
          <Text style={styles.categoryTitle}> Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>
        <TextInput
          placeholder='About'
          style={styles.input}
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          multiline
          onChangeText={(text) => {
            setAudioInfo({ ...audioInfo, about: text })
          }}
        />

        {/* This is the custom we made usign react native modal */}
        <CategorySelector
          title='Category'
          visible={showCategoryModal}
          onRequestClose={() => {
            SetShowCategoryModal(false)
          }}
          data={categories}
          renderItem={(item) => {
            return <Text style={styles.category}>{item}</Text>
          }}
          onSelect={(item) => {
            // Update only the 'category' field while preserving the rest of the audioInfo object
            setAudioInfo({ ...audioInfo, category: item })
          }}
        />
        <View style={{ marginBottom: 20 }} />
        <AppButton title="Submit" borderRadius={7} onPress={handleUpload} />
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
  formContainer: {
    marginTop: 20
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,

    textAlignVertical: "top"
  },
  category: {
    padding: 10,
    color: colors.PRIMARY
  },
  categorySelector: {
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 20
  },
  categoryTitle: {
    color: colors.CONTRAST
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic'
  }
});

export default Upload;