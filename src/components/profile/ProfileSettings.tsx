import { FC } from 'react'
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native'
import AppHeader from '../AppHeader';
import colors from '../../utils/colors';
import AvatarField from '../ui/AvatarField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppButton from '../ui/AppButton';


interface Props {

}
const ProfileSettings: FC<Props> = props => {
  return <View style={styles.container}>
    <AppHeader title='Settings' />

    <View style={styles.titleContainer}>
      <Text style={styles.title}>Profile Settings</Text>
    </View>
    <View style={styles.settignsOptionsContainer}>
      <View style={styles.avatarContainer}>
        <AvatarField />
        <Pressable style={styles.paddingLeft}>
          <Text style={styles.linkText}>Update Profile Image</Text>
        </Pressable>
      </View>
      <TextInput style={styles.nameInput} value='John Doe' />
      <View style={styles.emailContainer}>
        <Text style={styles.email}>john@email.com</Text>
        <MaterialIcons
          name='verified'
          size={15}
          color={colors.SECONDARY}
        />
      </View>
    </View>

    <View style={styles.titleContainer}>
      <Text style={styles.title}>Log Out</Text>
    </View>

    <View style={styles.settignsOptionsContainer}>
      <Pressable style={styles.logOutBtn}>
        <AntDesign name='logout' size={20} color={colors.CONTRAST}  />
        <Text style={styles.logOutBtnTitle}>Logout From All</Text>
      </Pressable>
       <Pressable style={styles.logOutBtn}>
        <AntDesign name='logout' size={20} color={colors.CONTRAST}  />
          <Text style={styles.logOutBtnTitle}>Logout</Text>
      </Pressable>
    </View>
    <View style={styles.marignTop}>
      <AppButton title='Submit' borderRadius={7} />
    </View>
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
  emailContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15
  },
  email:{
    color: colors.CONTRAST,
    marginRight: 10
  },
  logOutBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  logOutBtnTitle:{
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft:  5
  },
  marignTop:{
    marginTop: 15,
    padding: 10
  }

});

export default ProfileSettings;