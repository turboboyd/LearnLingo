import css from './TeacherAvatar.module.css'
export const TeacherAvatar = ({ teacher }) => (
  <div className={css.avatar}>
    <span></span>
    <img src={teacher.avatar_url} alt="Avatar_teacher" />
  </div>
);
