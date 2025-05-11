import React, { FC } from 'react';
import { View,StyleSheet } from 'react-native';
import Form from '../../components/form/index';
import SubmitBtn from '../../components/form/SubmitBtn';
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/form/AuthFormContainer';
import OtpField from '../../ui/otpField';
import AppButton from '../../components/ui/AppButton';

interface Props { }

const initialValues = {
  email: '',
};

const otpFields = new Array(6).fill("") //cratea an empty array of field 6 items with empty value 


const Verification: FC<Props> = props => {
  return (
      <Form
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
        >
        <AuthFormContainer 
            subTitle={`Your reset link’s waiting. Go grab it! `}
            title={'check your email '} 
        >
          <View style={styles.formContainer}>
            <View  style={styles.inputContainer}>
                 {
                otpFields.map((_,index)=>{
                   return <OtpField key={index} />
                })
            }
            </View>
           
          <AppButton title={'Send link'} />

          <View style={styles.linkContainer}>
            <AppLink title='Resend OTP' />
            <AppLink title='Go Back' />
          </View>
          </View>
        </AuthFormContainer>
      </Form>

  );
};

const styles = StyleSheet.create({

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
  inputContainer:{
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Verification;
