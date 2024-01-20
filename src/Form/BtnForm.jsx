import css from './BtnForm.module.css';


const BtnForm = ({ btnTitle, isSubmitting, randomStyle }) => {
  return (
    <button
      style={{
        backgroundColor: randomStyle.btn,
      }}
      className={css.btn}
      type="submit"
      disabled={isSubmitting}
    >
      {btnTitle}
    </button>
  );
};

export default BtnForm;
