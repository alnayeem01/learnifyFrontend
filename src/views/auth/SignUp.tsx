import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import colors from '../../utils/colors';
import AuthInputField from '../../components/AuthInputField';
import {Formik} from 'formik';
import * as yup from 'yup';

interface Props {}

//There is a formik prop for error validatea schema we will pass it there
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
      <Formik
        initialValues={initialValues}
        // This function is called when the form is submitted
        onSubmit={values => {
          console.log(values);
        }}
        // Validation schema for all fields
        validationSchema={signUpValidation}> 

        {/* Formik provides helper functions and states to manage form behavior.
        These include `handleSubmit` (for form submission),
        `handleChange` (to update field values),
        `values` (the current state of all inputs),
        and `errors` (validation error messages from Yup).
        */}
        {({handleSubmit, handleChange, values, errors}) => {
          return (
            <View style={styles.formContainer}>
              <AuthInputField
                label="Name"
                placeholder="John Doe"
                // When the Name input changes, Formik updates `values.name`
                onChange={handleChange('name')} 
                // If Yup validation fails for name, the error message is shown
                errorMsg={errors.name}
                 // Current value of the name field, kept in sync by Formik
                values={values.name}
              />
              <AuthInputField
                label="Email"
                placeholder="nayeem@hotmail.com"
                keyboardType="email-address"
                onChange={handleChange('email')}
                errorMsg={errors.email}
                values={values.email}
              />
              <AuthInputField
                label="Password"
                placeholder="**********"
                secureTextEntry
                onChange={handleChange('password')}
                errorMsg={errors.password}
                values={values.password}
              />
              <Button title={'Sign Up'} onPress={() => handleSubmit()} />
            </View>
          );
        }}
      </Formik>
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
