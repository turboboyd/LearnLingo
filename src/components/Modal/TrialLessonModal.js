import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import css from './TrialLessonModal.module.css';
import InputField from '../../Form/InputField';
import { trialLessonSchema } from 'Form/Schema/validationSchemas';
import { topicsArray } from './topicsArray';
import Title from 'Form/Title';
import BtnForm from 'Form/BtnForm';

const title = 'Book Trial Lesson';
const text =
  'Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.';

const TrialLessonModal = ({ teacher, randomStyle }) => {
  console.log('teacher: ', teacher);
  return (
    <Formik
      initialValues={{ fullName: '', email: '', phoneNumber: '' }}
      validationSchema={trialLessonSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <Form className={css.form}>
        <div className={css.title_wrap}>
          <Title title={title} text={text} />
          <div className={css.wrap_teacher}>
            <img
              className={css.avatar}
              src={teacher.avatar_url}
              alt="Avatar_teacher"
            />
            <div>
              <p >Your teacher</p>
              <h3>
                {teacher.name} {teacher.surname}
              </h3>
            </div>
          </div>
        </div>

        <h3 className={css.ask}>
          What is your main reason for learning English?
        </h3>
        {topicsArray.map((topic, index) => (
          <label className={css.radio_wrap} key={index}>
            <Field
              className={css.radio_btn}
              type="radio"
              name="topic"
              value={topic}
            />
            <span>{topic}</span>
          </label>
        ))}
        <ErrorMessage name="topic" component="div" />

        <div className={css.input_wrap}>
          <InputField name="fullName" placeholder="Full Name" />
          <InputField name="email" placeholder="Email" />
          <InputField name="phoneNumber" placeholder="Phone Number" />
        </div>
        <BtnForm randomStyle={randomStyle} btnTitle="Book" />
      </Form>
    </Formik>
  );
};

export default TrialLessonModal;
