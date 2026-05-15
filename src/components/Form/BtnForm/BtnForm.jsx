import css from './BtnForm.module.css';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../../redux/auth/authSelectors';
import PropTypes from 'prop-types';

const BtnForm = ({ btnTitle, disabled = false, type = 'submit', onClick }) => {
  const randomStyle = useSelector(selectRandomStyle);
  return (
    <button
      style={{
        '--color-btn': randomStyle.btn,
        '--active-color-btn': randomStyle.background,
      }}
      className={css.btn}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {btnTitle}
    </button>
  );
};

BtnForm.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
};

export default BtnForm;
