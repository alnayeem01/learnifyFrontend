import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import colors from '../../utils/colors';
import AuthInputField from '../../components/form/AuthInputField';
import * as yup from 'yup';
import Form from '../../components/form/index';
import SubmitBtn from '../../components/form/SubmitBtn';
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon';
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/form/AuthFormContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../@types/navigation';
import { FormikHelpers } from 'formik';
import client from '../../api/client';

interface Props { }

//There is a formik prop for error validatea schema we will pass it therenp
const signInValidation = yup.object({
  email: yup
    .string()
    .trim('Email is Missing!')
    .email('Invalid Email address!')
    .required('Email is Required!'),
  password: yup
    .string()
    .trim('Password is Missing!')
    .min(8, 'Password must be 8 characters long!')
    .required('Password is Required!'),
});
interface User {
  email: string,
  password: string,
};

const initialValues = {
  email: '',
  password: '',
};

const handleSubmit = async ( values: User, actions: FormikHelpers<User>) => {
  actions.setSubmitting(true)
        try{
          const res = await client.post('/auth/sign-in',{
            ...values
          })
          console.log(res?.data.profile)
        }catch(e){
          console.log(e)
        }
        actions.setSubmitting(false)
      }

const SignIn: FC<Props> = props => {

  //to resolve type issues we are providing genreric type of auth stack and also providing the type NavigationProp from react navigation
  const navigatation = useNavigation<NavigationProp<AuthStackParamList>>()

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const togglePassword = () => {
    setSecureTextEntry(!secureTextEntry)
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signInValidation}>
      <AuthFormContainer title={'Welcome Back!'} subTitle={`Let's get started by creating your account!`} >
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            label="Email"
            placeholder="nayeem@hotmail.com"
            keyboardType="email-address"
          />
          <AuthInputField
            name="password"
            label="Password"
            placeholder="**********"
            secureTextEntry={secureTextEntry}
            rightIcon={<PasswordVisibilityIcon privateIcon={secureTextEntry} />}
            onRightIconPress={() =>
              togglePassword()
            }
          />
          <SubmitBtn title={'Sign in'} />

          <View style={styles.linkContainer}>
            <AppLink title='I Lost my Password!' onPress={() => {
              navigatation.navigate("LostPassword")
            }} />
            <AppLink title='Sign Up' onPress={() => {
              navigatation.navigate("SignUp")
            }} />
          </View>
        </View>
      </AuthFormContainer>
    </Form>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,  // fix-up froom stackOverflow
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
    marginVertical: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  linkContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    marginTop: 30,
    alignItems: "center"
  },
  headingContainer: {
    alignItems: "center",
    gap: 10
  },
  headinText: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.SECONDARY,
  },
  headinTextTitle: {
    fontSize: 14,
    color: colors.CONTRAST,
  }
});

export default SignIn;
