import { Formik, Form } from 'formik';
import {
  registrationSchema,
  loginSchema,
} from 'components/Form/Schema/validationSchemas';
import { useDispatch, useSelector } from 'react-redux';
import css from './AuthForm.module.css';
import {
  registrationUser,
  loginUser,
  authorizationGoogle,
} from '../../../redux/auth/authOperation';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import Title from 'components/Form/Title/Title';
import BtnForm from 'components/Form/BtnForm/BtnForm';
import InputField from 'components/Form/InputField/InputField';
import GoogleButton from 'components/Form/GoogleButton/GoogleButton';
import PropTypes from 'prop-types';
import { selectRandomStyle } from '../../../redux/auth/authSelectors';

const AuthForm = ({ modalContent, isModal }) => {
  const dispatch = useDispatch();
  const randomStyle = useSelector(selectRandomStyle);
  const { IsAuthCheck } = useAuth();
  const [isLogin, setIsLogin] = useState(modalContent === 'login');
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

  const toggleMode = () => {
    setIsLogin(prev => !prev);
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
          <div className={css.title_wrap}>
            <Title title={title} text={text} />
          </div>

          <div className={css.wrap}>
            {!isLogin && (
              <InputField type="text" name="name" placeholder="Name" />
            )}
            <InputField type="email" name="email" placeholder="Email" />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <p className={css.text}>
            {isLogin ? "You don't have an account" : 'I have an account'}{' '}
            <span
              style={{
                color: randomStyle.btn,
              }}
              onClick={toggleMode}
            >
              {isLogin ? 'Sing Up' : 'Sing In'}
            </span>
          </p>
          <BtnForm btnTitle={btnTitle} isSubmitting={isSubmitting} />
          <GoogleButton handleLogin={handleLogin} />
        </Form>
      )}
    </Formik>
  );
};

AuthForm.propTypes = {
  modalContent: PropTypes.string.isRequired,
  isModal: PropTypes.func.isRequired,
};

export default AuthForm;
