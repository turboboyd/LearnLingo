import css from './BtnForm.module.css';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../../redux/auth/authSelectors';
import PropTypes from 'prop-types';

const BtnForm = ({ btnTitle, isSubmitting }) => {
  const randomStyle = useSelector(selectRandomStyle);
  return (
    <button
      style={{
        '--color-btn': randomStyle.btn,
        '--active-color-btn': randomStyle.background,
      }}
      className={css.btn}
      type="submit"
      disabled={isSubmitting}
    >
      {btnTitle}
    </button>
  );
};

BtnForm.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};

export default BtnForm;
