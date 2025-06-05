import { FC, useEffect, useState } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native'
import AppHeader from '../AppHeader';
import colors from '../../utils/colors';
import AvatarField from '../ui/AvatarField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../ui/AppButton';
import { getClient } from '../../api/client';
import catchAsyncError from '../../api/catchError';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotification } from '../../store/notificaton';
import { keys, removeFromAsyncStorage } from '../../utils/asyncStorage';
import { getAuthState, updateBusyState, updateLoggedInState, updateProfile } from '../../store/auth';
import deepEqual from 'deep-equal';
import ImagePicker from "react-native-image-crop-picker";
import ReVerification from '../ReVerification';
import { useNavigation } from '@react-navigation/native';

interface Props { }

interface ProfileInfo {
  name: string;
  avatar?: string
};

const ProfileSettings: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState<ProfileInfo>({ name: "" });
  const [busy,setBusy] = useState(false);
  const dispatch = useDispatch();
  const { profile } = useSelector(getAuthState);        //getting it from redux store 

  //her ewe will compare the local state of userInfo withour redux store userInfo if it is same than this is equal will return true
  const isSame = deepEqual(userInfo, {
    name: profile?.name,
    avatar: profile?.avatar
  });


  const handleLogOut = async (fromAll?: boolean) => {
    // if fromAll == yes this will log out the user form all devices.
    // the busy state is true now
    dispatch(updateBusyState(true))
    try {
      const endPoint = '/auth/log-out/?fromAll=' + (fromAll ? 'yes' : "");
      const client = await getClient();
      const res = await client.post(endPoint);
      await removeFromAsyncStorage(keys.Auth_TOKEN)
    } catch (e) {
      const errorMessage = catchAsyncError(e);
      dispatch(updateNotification({ message: errorMessage, type: 'error' }))
      // we also have to update the profileState from redux store
      dispatch(updateProfile(null));
      dispatch(updateLoggedInState(false))
    }
    dispatch(updateBusyState(false));
  };

  // when user submit with updated data for userInfo
  const hanldleSubmit = async () => {
    setBusy(true)
    try {
      if (!userInfo.name.trim()) {
        return dispatch(updateNotification({ message: 'Profile name is required!', type: 'error' }))
      };
      const formData = new FormData();
      formData.append('name', userInfo.name);

      //if user Changes avatar add to the formData
      if(userInfo.avatar){
        formData.append('avatar', {
          name: 'avatar',
          type: 'image/jpeg',
          uri: userInfo.avatar
        })
      }

      const client = await getClient({ "Content-Type": "multipart/form-data" })
      const {data} = await client.post('/auth/update-profile', formData);
      //update the profile state in redux store after API call is made
      dispatch(updateProfile(data.profile));
       dispatch(updateNotification({ message: "Your Profile is updated!", type: 'success' }))
    } catch (e) {
       const errorMessage = catchAsyncError(e);
      dispatch(updateNotification({ message: errorMessage, type: 'error' }))
    }
     setBusy(false)
  };

  //image Select
  const handleImageSelect = async ()=>{

    try{
      const {path} = await ImagePicker.openPicker({
        cropping: false,
        height: 400,
        width: 300
      });
      setUserInfo({...userInfo, avatar: path});
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    if (profile) setUserInfo({ name: profile.name, avatar: profile.avatar })
  }, [profile]);

  return <View style={styles.container}>
    <AppHeader title='Settings' />

    <View style={styles.titleContainer}>
      <Text style={styles.title}>Profile Settings</Text>
    </View>
    <View style={styles.settignsOptionsContainer}>
      <View style={styles.avatarContainer}>
        <AvatarField source={userInfo.avatar} />
        <Pressable style={styles.paddingLeft} onPress={(handleImageSelect)}  >
          <Text style={styles.linkText}>Update Profile Image</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.nameInput}
        value={userInfo.name}
        onChangeText={text =>
          setUserInfo({ ...userInfo, name: text })}
      />
      <View style={styles.emailContainer}>
        <Text style={styles.email}>{profile?.email}</Text>
        {profile?.verified ? 
        <MaterialIcons
          name='verified'
          size={15}
          color={colors.SECONDARY}
        /> : 
        <ReVerification time={60} linkTitle='verify' 
          ativeAtFirst
        />
        }
      </View>
    </View>

    <View style={styles.titleContainer}>
      <Text style={styles.title}>Log Out</Text>
    </View>

    <View style={styles.settignsOptionsContainer}>
      <Pressable onPress={() => handleLogOut(true)} style={styles.logOutBtn}>
        <AntDesign name='logout' size={20} color={colors.CONTRAST} />
        <Text style={styles.logOutBtnTitle}>Logout From All</Text>
      </Pressable>
      <Pressable onPress={() => handleLogOut()} style={styles.logOutBtn}>
        <AntDesign name='logout' size={20} color={colors.CONTRAST} />
        <Text style={styles.logOutBtnTitle}>Logout</Text>
      </Pressable>
    </View>
    {!isSame ?
      <View style={styles.marignTop}>
        <AppButton title='Submit' borderRadius={7} onPress={hanldleSubmit} busy={busy} />
      </View> : null
    }

  </View>
};

const styles = StyleSheet.create({
  container: {

  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    marginTop: 15,
    padding: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY
  },
  settignsOptionsContainer: {
    marginLeft: 15,
    paddingLeft: 15
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
  },
  paddingLeft: {
    paddingLeft: 10
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    padding: 10,
    fontSize: 18,
    borderWidth: .5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
    marginRight: 10
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 10
  },
  logOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  logOutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5
  },
  marignTop: {
    marginTop: 15,
    padding: 10
  }

});

export default ProfileSettings;