import { Formik, FormikHelpers } from 'formik'
import { ReactNode } from 'react'



interface Props<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit(values: T, formikHelpers: FormikHelpers<T>): void;
  children: ReactNode
}
const Form = <T extends object>(props: Props<T>) => {
  return (
    <Formik
      // This function is called when the form is submitted
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
      // Validation schema for all fields
      validationSchema={props.validationSchema}
    >
      {props.children}
    </Formik>
  )
};

export default Form;