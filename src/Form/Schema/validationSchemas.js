import { topicsArray } from 'components/Modal/topicsArray';
import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  email: Yup.string().email('Invalid email format').required('Required field'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    // )
    .required('Required field'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Required field'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
    //   'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    // )
    .required('Required field'),
});


export const trialLessonSchema = Yup.object({
  fullName: Yup.string().required('Required field'),
  email: Yup.string()
    .email('Неверный адрес электронной почты')
    .required('Required field'),
  phoneNumber: Yup.string().required('Required field'),
  topic: Yup.string()
    .oneOf(topicsArray, 'Недопустимая тема')
    .required('Required field'),
});