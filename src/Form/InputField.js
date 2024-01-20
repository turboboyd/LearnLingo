import { Field, ErrorMessage } from 'formik';
import css from './InputField.module.css'
const InputField = ({ name, placeholder }) => (
  <>
    <Field
      className={css.input}
      type="text"
      name={name}
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="div" />
  </>
);

export default InputField;
