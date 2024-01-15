import css from './TeacherInfo.module.css';

export default function TeacherInfo({ teacher }) {
  return (
    <>
      <h2 className={css.name}>
        {teacher.name} {teacher.surname}
      </h2>
      <div className={css.teacher_info_text}>
        <p>
          <span className={css.servis_span}>Speaks:</span>{' '}
          <span className={css.speaks}>{teacher.languages.join(', ')}</span>
        </p>
        <p>
          <span className={css.servis_span}>Lesson Info:</span>{' '}
          {teacher.lesson_info}
        </p>
        <p>
          <span className={css.servis_span}>Conditions:</span>{' '}
          {teacher.conditions.join(', ')}
        </p>
      </div>
    </>
  );
}
