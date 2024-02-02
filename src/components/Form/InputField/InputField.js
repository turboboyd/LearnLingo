import { Field, ErrorMessage } from 'formik';
import css from './InputField.module.css'
import PropTypes from 'prop-types';

const InputField = ({type, name, placeholder }) => (
  <>
    <Field
      className={css.input}
      type={type}
      name={name}
      placeholder={placeholder}
    />
    <ErrorMessage className={css.error}  name={name} component="div" />
  </>
);

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default InputField;
