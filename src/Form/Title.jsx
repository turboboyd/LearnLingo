
import css from './Title.module.css';


const Title = ({ title, text }) => {
  return (
    <>
      <h2 className={css.title_form}>{title}</h2>
      <p className={css.text_form}>{text}</p>
    </>
  );
};
export default Title;
