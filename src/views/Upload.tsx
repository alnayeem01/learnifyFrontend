import { FC, useState } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput, ScrollView } from 'react-native'

import colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FileSelector from '../components/FileSelector';
import AppButton from '../components/ui/AppButton';
import CategorySelector from '../components/CategorySelector';
import { categories } from '../utils/Categories';
import { DocumentPickerResponse, types } from '@react-native-documents/picker';
import * as yup from 'yup'
import client, { getClient } from '../api/client';
import { getFromAsyncStorage, keys } from '../utils/asyncStorage';
import Progress from '../ui/Progress';
import { mapRange } from '../utils/math';



interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: DocumentPickerResponse;
  poster?: DocumentPickerResponse;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
  file: undefined,
  poster: undefined
};


//for validation using yup 
const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is missing!'),
  category: yup.string().oneOf(categories, 'Category is missing!'),
  about: yup.string().trim().required('About is missing!'),
  file: yup.object().shape({
    uri: yup.string().required('Audio file is missing!'),
    name: yup.string().required('Audio file is missing!'),
    type: yup.string().required('Audio file is missing!'),
    size: yup.number().required('Audio file is missing!'),
  }),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});

interface Props { }

const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [audioInfo, setAudioInfo] = useState({ ...defaultForm });
  const [uploadProg, setUploadProg] = useState<number>(0)
  const [busy, setBusy] = useState(false)
  const handleUpload = async () => {
    try {
      setBusy(true)
      console.log('clicked')
      //this validate functin  yup
      const finalData = await audioInfoSchema.validate(audioInfo);

      const formData = new FormData();

      formData.append('title', finalData.title);
      formData.append('about', finalData.about);
      formData.append('category', finalData.category);
      formData.append('file', {
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });


      if (finalData.poster.uri)
        formData.append('poster', {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });

      const client = await getClient({'Content-Type': 'multipart/form-data;'});
      const data = await client.post('/audio/create', formData,{
        //using the onUploadProgress function from axios to calcoulate the percerntage of progress 
        onUploadProgress(progressEvent) {
          // util function for calculating progress
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded
          });
          //when upload reaches 100 we reset the form 
          if(uploaded >=100){
            setAudioInfo({...defaultForm})
            setBusy(false)
          }
          setUploadProg(Math.floor(uploaded))
        },
      });
      setBusy(false)
      console.log("The podcast is uploaded: ", data);
    } catch (error: any) {
      if (error instanceof yup.ValidationError)
        console.log('Validation error: ', error.message);
      else console.log(error.response.data);
    }
    setBusy(false)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelctorContainer}>
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
          options={{ type: [types.images] }}
          onSelect={poster => {
            setAudioInfo({ ...audioInfo, poster });
          }}
        />
        <FileSelector
          icon={
            <MaterialCommunityIcons
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{ marginLeft: 20 }}
          options={{ type: [types.audio] }}
          onSelect={file => {
            setAudioInfo({ ...audioInfo, file });
          }}
        />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          style={styles.input}
          onChangeText={text => {
            setAudioInfo({ ...audioInfo, title: text });
          }}
          value={audioInfo.title}
        />

        <Pressable
          onPress={() => {
            setShowCategoryModal(true);
          }}
          style={styles.categorySelector}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
          onChangeText={text => {
            setAudioInfo({ ...audioInfo, about: text });
          }}
          value={audioInfo.about}
        />

        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => {
            setShowCategoryModal(false);
          }}
          title="Category"
          data={categories}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => {
            setAudioInfo({ ...audioInfo, category: item });
          }}
        />

        <View style={{ marginBottom: 20 }} />

        {busy && <Progress style={{ marginBottom: 20 }} progress={uploadProg} />}



        <AppButton busy={busy} borderRadius={7} title="Submit" onPress={handleUpload} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelctorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;
