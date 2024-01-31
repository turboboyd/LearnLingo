import React from 'react';
import { useSelector } from 'react-redux';
import styles from './GoogleButton.module.css';
import sprite from 'images/InlineSprite.svg';
import { selectRandomStyle } from '../../../redux/auth/authSelectors';
import PropTypes from 'prop-types';

const GoogleButton = ({ handleLogin }) => {
  const randomStyle = useSelector(selectRandomStyle);

  return (
    <button
      className={styles.google_btn}
      onClick={handleLogin}
      style={{
        '--active-color-btn': randomStyle.background,
      }}
    >
      <svg className={styles.icon_google}>
        <use xlinkHref={`${sprite}#google`} />
      </svg>
       Sign in with Google
    </button>
  );
};

GoogleButton.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default GoogleButton;