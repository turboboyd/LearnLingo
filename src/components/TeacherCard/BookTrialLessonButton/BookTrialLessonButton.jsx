import css from './BookTrialLessonButton.module.css'
export const BookTrialLessonButton = ({ expanded, randomStyle, openModal }) =>
  expanded && (
    <button
      className={css.btn}
      type="button"
      style={{
        backgroundColor: randomStyle.btn,
        '--active-color': 'red',
      }}
      onClick={openModal}
    >
      Book trial lesson
    </button>
  );
