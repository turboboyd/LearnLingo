import css from './BookTrialLessonButton.module.css'
export const BookTrialLessonButton = ({ expanded, randomStyle, openModal }) =>
  expanded && (
    <button
      className={css.btn}
      type="button"
      style={{
        '--color-btn': randomStyle.btn,
        '--active-color-btn': randomStyle.background,
      }}
      onClick={openModal}
    >
      Book trial lesson
    </button>
  );
