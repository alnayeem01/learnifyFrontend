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
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/form/AuthFormContainer';

interface Props { }

//There is a formik prop for error validatea schema we will pass it therenp
const passwordValidation = yup.object({
  email: yup
    .string()
    .trim('Email is Missing!')
    .email('Invalid Email address!')
    .required('Email is Required!'),
});

const initialValues = {
  email: '',
};

const LostPassword: FC<Props> = props => {
  return (
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={passwordValidation}>
        <AuthFormContainer 
            subTitle={`No stress — just set a new one.`}
            title={'Lost your Password!'} 
        >
          <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            label="Email"
            placeholder="nayeem@hotmail.com"
            keyboardType="email-address"
          />
          <SubmitBtn title={'Send link'} />

          <View style={styles.linkContainer}>
            <AppLink title='Sign Up' />
            <AppLink title='Go Back' />
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
  headingContainer:{
    alignItems: "center",
    gap: 10
  },
  headinText:{
    fontSize: 26,
    fontWeight: "bold",
    color: colors.SECONDARY,
  },
  headinTextTitle:{
    fontSize: 14,
    color: colors.CONTRAST,
  }
});

export default LostPassword;
