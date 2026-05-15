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
import { useState, useCallback, useMemo } from 'react';
import Title from 'components/Form/Title/Title';
import BtnForm from 'components/Form/BtnForm/BtnForm';
import InputField from 'components/Form/InputField/InputField';
import GoogleButton from 'components/Form/GoogleButton/GoogleButton';
import PropTypes from 'prop-types';
import {
  selectError,
  selectIsLoading,
  selectRandomStyle,
} from '../../../redux/auth/authSelectors';
import { clearAuthError } from '../../../redux/auth/authSlice';

const DEFAULT_AUTH_ERROR =
  'Email or password is incorrect. Please check your credentials and try again.';

const getReadableSubmitError = error => {
  if (typeof error === 'string') {
    return error;
  }

  return error?.message || DEFAULT_AUTH_ERROR;
};

const AuthForm = ({ modalContent, onAuthSuccess }) => {
  const dispatch = useDispatch();
  const randomStyle = useSelector(selectRandomStyle);
  const authError = useSelector(selectError);
  const isAuthLoading = useSelector(selectIsLoading);
  const [isLogin, setIsLogin] = useState(modalContent === 'login');
  const [submitError, setSubmitError] = useState(null);

  const initialValue = useMemo(
    () =>
      isLogin
        ? { email: '', password: '' }
        : { name: '', email: '', password: '' },
    [isLogin]
  );
  const title = isLogin ? 'Log In' : 'Registration';
  const text = isLogin
    ? 'Welcome back! Please enter your credentials to access your account and continue searching for a teacher.'
    : 'Create an account to save favorite tutors and book a trial lesson.';
  const validSchema = isLogin ? loginSchema : registrationSchema;
  const btnTitle = isLogin ? 'Log In' : 'Sign Up';
  const visibleError = submitError || authError;

  const resetSubmitError = useCallback(() => {
    setSubmitError(null);
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSuccessfulAuth = authenticatedUser => {
    if (!authenticatedUser?.uid) {
      setSubmitError(DEFAULT_AUTH_ERROR);
      return;
    }

    onAuthSuccess(authenticatedUser);
  };

  const submitCredentials = async (values, setSubmitting) => {
    resetSubmitError();

    const credentials = {
      ...values,
      email: values.email.trim(),
    };

    try {
      const authenticatedUser = isLogin
        ? await dispatch(loginUser(credentials)).unwrap()
        : await dispatch(registrationUser(credentials)).unwrap();

      handleSuccessfulAuth(authenticatedUser);
    } catch (error) {
      setSubmitError(getReadableSubmitError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async event => {
    event?.preventDefault();
    event?.stopPropagation();

    resetSubmitError();

    try {
      const authenticatedUser = await dispatch(authorizationGoogle()).unwrap();
      handleSuccessfulAuth(authenticatedUser);
    } catch (error) {
      setSubmitError(getReadableSubmitError(error));
    }
  };

  const toggleMode = event => {
    event.preventDefault();
    event.stopPropagation();
    resetSubmitError();
    setIsLogin(prev => !prev);
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validSchema}
      onSubmit={(values, { setSubmitting }) =>
        submitCredentials(values, setSubmitting)
      }
      enableReinitialize
    >
      {({ isSubmitting }) => {
        const isDisabled = isSubmitting || isAuthLoading;

        return (
          <Form
            className={css.form}
            onClick={event => event.stopPropagation()}
            noValidate
          >
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

            {visibleError && (
              <p className={css.error} role="alert" aria-live="polite">
                {visibleError}
              </p>
            )}

            <p className={css.text}>
              {isLogin ? "You don't have an account" : 'I have an account'}{' '}
              <button
                type="button"
                className={css.btn_login}
                style={{
                  color: randomStyle.btn,
                }}
                onClick={toggleMode}
                disabled={isDisabled}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
            <BtnForm
              type="submit"
              btnTitle={isAuthLoading ? 'Please wait...' : btnTitle}
              disabled={isDisabled}
            />
            <GoogleButton handleLogin={handleGoogleLogin} disabled={isDisabled} />
          </Form>
        );
      }}
    </Formik>
  );
};

AuthForm.propTypes = {
  modalContent: PropTypes.string.isRequired,
  onAuthSuccess: PropTypes.func.isRequired,
};

export default AuthForm;
