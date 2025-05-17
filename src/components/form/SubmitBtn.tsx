import { useFormik, useFormikContext } from 'formik';
import { FC } from 'react'
import {  StyleSheet, Button } from 'react-native'
import AppButton from '../ui/AppButton';


interface Props{
    title: string;
}
const SubmitBtn:FC<Props> = props => {
    const {handleSubmit, isSubmitting} = useFormikContext()
  return  (
      <AppButton busy={isSubmitting}  onPress={() => handleSubmit()} title={props.title}/>
  )
};

const styles = StyleSheet.create({
    container: {}
});

export default SubmitBtn;