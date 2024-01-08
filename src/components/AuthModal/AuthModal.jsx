import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registrationSchema, loginSchema } from 'utils/validationSchemas';
import { login, register } from 'utils/authFunctions';
import css from './AuthModal.module.css'

const AuthModal = ({ modalContent }) => {

  const isLogin = modalContent === 'login';
  const initialValue = isLogin
    ? { email: '', password: '' }
    : { name: '', email: '', password: '' };
  const title = isLogin ? 'Log In' : 'Registration';
  const text = isLogin
    ? ' Welcome back! Please enter your credentials to access your account and continue your search for an teacher.'
    : 'Thank you for your interest in our platform! In order to register, weneed some information. Please provide us with the following information';
  const validSchema = isLogin ? loginSchema : registrationSchema;
  const btnTitle = isLogin ? 'Log In' : 'Sign Up';


  const onSubmit = async values => {
    if (isLogin) {
      console.log('isLogin: ', isLogin);
      const user = await login(values);
      console.log(user);
    } else {
            console.log('values: ', values);
      const user = await register(values);

      console.log(user);
    }
  };


  return (
    <Formik
      className={css.form}
      initialValues={initialValue}
      validationSchema={validSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className={css.title}>{title}</h2>
          <p className={css.texta}>{text}</p>
          <div className={css.wrap}>
           {!isLogin ? <div className={css.input_box}>
              <Field
                className={css.input}
                type="text"
                name="name"
                placeholder="Name"
              />
              <ErrorMessage className={css.error} name="name" component="div" />
            </div> : null}
            <div className={css.input_box}>
              <Field
                className={css.input}
                type="email"
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                className={css.error}
                name="email"
                component="div"
              />
            </div>
            <div className={css.input_box}>
              <Field
                className={css.input}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className={css.error}
                name="password"
                component="div"
              />
            </div>
          </div>
          <button className={css.btn} type="submit" disabled={isSubmitting}>
            {btnTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthModal;