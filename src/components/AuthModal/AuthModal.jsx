import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registrationSchema, loginSchema } from 'Form/Schema/validationSchemas';
import { useDispatch } from 'react-redux';
import css from './AuthModal.module.css';
import {
  registrationUser,
  loginUser,
  authorizationGoogle,
} from '../../redux/auth/authOperation';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import sprite from 'images/InlineSprite.svg';
import Title from 'Form/Title';
import BtnForm from 'Form/BtnForm';


const AuthModal = ({ modalContent, isModal }) => {
  const dispatch = useDispatch();
  const { IsAuthCheck } = useAuth();

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
      await dispatch(loginUser(values));
    } else {
      await dispatch(registrationUser(values));
    }
  };
  const handleLogin = async () => {
    const resultAction = await dispatch(authorizationGoogle());
    console.log('resultAction: ', resultAction);
  };
  useEffect(() => {
    if (IsAuthCheck) {
      isModal();
    }
  }, [IsAuthCheck, isModal]);
  return (
    <Formik
      className={css.form}
      initialValues={initialValue}
      validationSchema={validSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Title title={title} text={text} />

          <div className={css.wrap}>
            {!isLogin ? (
              <div className={css.input_box}>
                <Field
                  className={css.input}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  className={css.error}
                  name="name"
                  component="div"
                />
              </div>
            ) : null}
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
          <BtnForm btnTitle={btnTitle} isSubmitting={isSubmitting} />
          <button className={css.google_btn} onClick={handleLogin}>
            <svg className={css.icon_google}>
              <use xlinkHref={`${sprite}#google`} />
            </svg>
            Sign in with Google
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AuthModal;
