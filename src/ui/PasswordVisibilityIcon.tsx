import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
// import Icon from 'react-native-vector-icons/Entypo';
import colors from '../utils/colors';


interface Props{
    privateIcon: boolean;
}
const PasswordVisibilityIcon:FC<Props> = ({privateIcon}) => {
  return privateIcon ? <Icon name='eye' size={16} color={colors.SECONDARY} /> :<Icon name='eyeo' size={16} color={"white"} />
};



export default PasswordVisibilityIcon;