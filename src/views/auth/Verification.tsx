import React, { FC, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppLink from '../../ui/AppLink';
import AuthFormContainer from '../../components/form/AuthFormContainer';
import OtpField from '../../ui/otpField';
import AppButton from '../../components/ui/AppButton';

interface Props { }

const otpLength = 6;

const Verification: FC<Props> = () => {
  const [otp, setOtp] = useState(new Array(otpLength).fill(''));
  const inputRefs = useRef<TextInput[]>([]);
  const prevOtp = useRef([...otp]);

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


  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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

        <AppButton title="Send link" />

        <View style={styles.linkContainer}>
          <AppLink title="Resend OTP" />
          <AppLink title="Go Back" />
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
});

export default Verification;
