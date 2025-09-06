import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FC, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ProfileNavigatorStackParamList } from '../../@types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colors from '../../utils/colors';
import AudioForm from '../form/AudioForm';
import { getClient } from '../../api/client';
import { AudioData } from '../../@types/audio';
import { mapRange } from '../../utils/math';
import { useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import catchAsyncError from '../../api/catchError';

type Props = NativeStackScreenProps<ProfileNavigatorStackParamList, 'UpdateAudio'>

const UpdateAudio: FC<Props> = props => {
    const [busy, setBusy] = useState(false);
    const [uploadProg, setUploadProg] = useState<number>(0)
    const { item } = props.route.params
     const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

    const handleUpdate = async (formData: FormData) => {
    setBusy(true);
    try {
      console.log('item from form ',item)
      const client = await getClient({'Content-Type': 'multipart/form-data;'});

      const {data} = await client.patch('/audio/' + item.id, formData, {
        onUploadProgress(progressEvent) {
          const uploaded = mapRange({
            inputMin: 0,
            inputMax: progressEvent.total || 0,
            outputMin: 0,
            outputMax: 100,
            inputValue: progressEvent.loaded,
          });

          if (uploaded >= 100) {
            setBusy(false);
          }

          setUploadProg(Math.floor(uploaded));
        },
      });

      queryClient.invalidateQueries({queryKey: ['uploads-by-profile']});
      navigate('Profile');
    } catch (error) {
     
    }
    setBusy(false);
  };
    return <View style={styles.container}>
        <AudioForm progress={uploadProg} onSubmit={(data) => handleUpdate(data)} busy={busy} initialValues={{title: item.title, about: item?.about,category: item.category}} />
    </View>
};

const styles = StyleSheet.create({
    container: { flex: 1 }
});

export default UpdateAudio;
