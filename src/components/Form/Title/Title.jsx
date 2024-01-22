
import css from './Title.module.css';
import PropTypes from 'prop-types';

const Title = ({ title, text }) => {
  return (
    <>
      <h2 className={css.title_form}>{title}</h2>
      <p className={css.text_form}>{text}</p>
    </>
  );
};
Title.propTypes = {
  title: PropTypes.string.isRequired, 
  text: PropTypes.string.isRequired, 
};

export default Title;
