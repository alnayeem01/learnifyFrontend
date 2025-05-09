import React, {FC} from 'react';
import {View, StyleSheet, TextInput, SafeAreaView, Text} from 'react-native';
import colors from '../../utils/colors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppInput from '../../ui/AppInput';
import AuthInputField from '../../components/AuthInputField';

interface Props {}
const SignUp: FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField label='Name' placeholder='John Doe'/>
        <AuthInputField label='Email' placeholder='nayeem@hotmail.com' keyboardType='email-address' />
        <AuthInputField label='Password'   placeholder="**********" secureTextEntry/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 25,
    color: colors.CONTRAST,
  },
  label: {
    color: colors.CONTRAST,
    marginVertical: 10
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 15
  }
});

export default SignUp;
