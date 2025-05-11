import React, { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import colors from '../../utils/colors';
import AuthInputField from '../../components/form/AuthInputField';
import * as yup from 'yup';
import Form from '../../components/form/index';
import SubmitBtn from '../../components/form/SubmitBtn';
import Icon from 'react-native-vector-icons/AntDesign'
import PasswordVisibilityIcon from '../../ui/PasswordVisibilityIcon';
import AppLink from '../../ui/AppLink';
import CircleUI from '../../ui/CircleUI';

interface Props { }

//There is a formik prop for error validatea schema we will pass it therenp
const signUpValidation = yup.object({
  name: yup
    .string()
    .trim('Name is Missing!')
    .min(3, 'Invalid name')
    .required('Name is Required!'),
  email: yup
    .string()
    .trim('Email is Missing!')
    .email('Invalid Email address!')
    .required('Email is Required!'),
  password: yup
    .string()
    .trim('Password is Missing!')
    .min(8, 'Password must be 8 characters long!')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain at least one uppercase letter, one number, and one special character.',
    )
    .required('Password is Required!'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUp: FC<Props> = props => {

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const togglePassword = () => {
    setSecureTextEntry(!secureTextEntry)
  };

  return (
    <SafeAreaView style={styles.container}>
      <CircleUI size={200} position={'top-left'} />
      <CircleUI size={100} position={'top-right'} />
      <CircleUI size={100} position={'bottom-left'} />
      <CircleUI size={200 / 2} position={'bottom-right'} />
      {/*  Formik is initialized with default field values using `initialValues`
      and a Yup-based schema `signUpValidation` to handle form validation rules. */}
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={signUpValidation}>
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            label="Name"
            placeholder="John Doe"
          />
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
          <SubmitBtn title={'Sign Up'} />

          <View style={styles.linkContainer}>
            <AppLink title='I Lost my Password!' />
            <AppLink title='Sign in ' />
          </View>
        </View>
      </Form>

    </SafeAreaView>
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
  }
});

export default SignUp;
