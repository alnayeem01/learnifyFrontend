import { FC } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import EntypeIcon from 'react-native-vector-icons/Entypo'
import colors from '../../utils/colors';

interface Props {
  source?: string
}

const avatarSize = 70

const AvatarField: FC<Props> = ({ source }) => {
  return (
  <View style={styles.container}>
    {source ? 
    <Image 
      source={{ uri: source }} 
      style={styles.avatarImg} 
    /> : 
    <View style={styles.avatarImg}> 
      <EntypeIcon 
        name='mic' 
        size={30} 
        color={colors.PRIMARY} 
      /> 
    </View>}
  </View>
  )
};

const styles = StyleSheet.create({
  container: {

  },
  avatarImg: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: colors.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: colors.CONTRAST
  }
});

export default AvatarField;