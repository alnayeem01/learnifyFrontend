import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/form/AuthFormContainer';
import OtpField from '../../ui/otpField';
import AppButton from '../../components/ui/AppButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../@types/navigation';
import client from '../../api/client';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FormikHelpers } from 'formik';
import Loader from '../../ui/Loader';
import colors from '../../utils/colors';

type Props = NativeStackScreenProps<AuthStackParamList,  "Verification">

const otpLength = 6;

const Verification: FC<Props> = (props) => {

   const navigation = useNavigation<NavigationProp<AuthStackParamList>>()
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  const prevOtp = useRef([...otp]);

  const {userInfo} = (props.route.params)
  const [busy, setbusy] = useState(false)
  const [countDown, setCountDown] = useState(60)
    const [canSendNewOtpReq, setCanSendNewOtpReq] = useState(false)

  const handleSubmit = async ()=>{
   
    setbusy(true)
    try{
      const {data} = await client.post('/auth/verify-email', {
      token : otp.join(""),
      userId : userInfo.id
    })  
      //navigate to sign in after success
       navigation.navigate("SignIn")
    }catch(e){
      console.log(e)
    }
    setbusy(false)
   
  }

  const handleChangeText = (text: string, index: number) => {
    if (text.length > 1) return; // Prevent pasting multiple chars

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    // Detect if user pressed backspace (text empty now, was filled before)
    if (prevOtp.current[index] && !text) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (text) {
      // Move forward if a digit entered
      if (index < otpLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    prevOtp.current = newOtp;
  };
  //re-send OTP 
  const handleOtp =async ()=>{
    setCountDown(60)
    setCanSendNewOtpReq(false)
    try{
      await client.post('/auth/re-verify-email', {
      userId: userInfo.id
    })
    }catch(e){
      console.log(e)
    }
  }


  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

   useEffect(() => {
    const intervalId = setInterval(()=>{
      setCountDown((oldCountDown)=>{
        if(oldCountDown <=0){
          setCanSendNewOtpReq(true)
          return 0
        }
        return oldCountDown - 1
      } )
    }, 1000);
    return ()=>{
      clearInterval(intervalId)
    }
}, [canSendNewOtpReq]);

  return (
    <AuthFormContainer
      title="check your email"
      subTitle="Your reset link’s waiting. Go grab it!"
    >
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {otp.map((digit, index) => (
            <OtpField
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref!;
              }}
              value={digit}
              onChangeText={text => handleChangeText(text, index)}
              placeholder="*"
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <AppButton title={!busy? "Submit": <Loader />} onPress={handleSubmit}/>

        <View style={styles.linkContainer}>
          <Text style={styles.countDown}>{countDown} Sec</Text>
          <AppLink active={canSendNewOtpReq} title="Resend OTP" onPress={handleOtp} />
          <AppLink title="Go Back" onPress={() => {
              navigation.navigate("SignUp");
            }} />
        </View>
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-between',
    marginTop: 30,
    alignItems: 'center',
  },
  countDown:{
    color: colors.SECONDARY,
    marginRight: 7
  }
});

export default Verification;
