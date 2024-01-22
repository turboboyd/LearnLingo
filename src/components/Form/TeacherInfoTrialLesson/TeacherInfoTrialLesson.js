
import PropTypes from 'prop-types';
import css from './TeacherInfoTrialLesson.module.css';

const TeacherInfoTrialLesson = ({ teacher }) => (
  <div className={css.wrap_teacher}>
    <img className={css.avatar} src={teacher.avatar_url} alt="Avatar_teacher" />
    <div>
      <p>Your teacher</p>
      <h3>
        {teacher.name} {teacher.surname}
      </h3>
    </div>
  </div>
);

TeacherInfoTrialLesson.propTypes = {
  teacher: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeacherInfoTrialLesson;
