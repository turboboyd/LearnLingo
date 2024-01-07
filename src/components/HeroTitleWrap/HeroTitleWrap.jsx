import css from './HeroTitleWrap.module.css';



export default function HeroTitleWrap({randomStyle}) {
  return (
    <div className={css.wrap_title}>
      <h1 className={css.title}>
        Unlock your potential with the best{' '}
        <span
          className={`${css.title_span}`}
          style={{ backgroundColor: randomStyle.background }}
        >
          language
        </span>{' '}
        tutors
      </h1>
      <p className={css.text}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button
        className={`${css.btn} ${css[randomStyle.name]}`}
        style={{ backgroundColor: randomStyle.btn }}
      >
        Get started
      </button>
    </div>
  );
}
