import { topicsArray } from 'components/Form/Topics/topicsArray';
import * as Yup from 'yup';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

const emailValidation = Yup.string()
  .matches(emailRegex, 'Invalid email format')
  .required('Required field');

const passwordValidation = Yup.string()
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    passwordRegex,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  )
  .required('Required field');

export const registrationSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  email: emailValidation,
  password: passwordValidation,
});

export const loginSchema = Yup.object().shape({
  email: emailValidation,
  password: passwordValidation,
});

export const trialLessonSchema = Yup.object({
  fullName: Yup.string().required('Required field'),
  email: emailValidation,
  phoneNumber: Yup.string().required('Required field'),
  topic: Yup.string()
    .oneOf(topicsArray, 'Invalid topic')
    .required('Required field'),
});
