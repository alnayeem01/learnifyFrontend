import React, { FC } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import colors from '../../utils/colors';
import AuthInputField from '../../components/form/AuthInputField';
import * as yup from 'yup';
import Form from '../../components/form/index';
import SubmitBtn from '../../components/form/SubmitBtn';

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
  return (
    <SafeAreaView style={styles.container}>
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
            secureTextEntry
          />
          <SubmitBtn title={'Sign Up'} />
        </View>
      </Form>
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
    marginVertical: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default SignUp;
