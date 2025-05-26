import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { UserProfile } from '../store/auth';
import AvatarField from './ui/AvatarField';


interface Props{
    profile?: UserProfile | null,
    
}
const ProfileContainer:FC<Props> = ({profile}) => {
    if(!profile) return null;

  return (
      <View style={styles.container}>
        <AvatarField source={profile.avatar} />
      </View>
  )
  
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});

export default ProfileContainer;