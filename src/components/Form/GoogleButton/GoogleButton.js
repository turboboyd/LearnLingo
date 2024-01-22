import React from 'react';
import css from './GoogleButton.module.css';
import sprite from 'images/InlineSprite.svg';
import PropTypes from 'prop-types';

const GoogleButton = ({ handleLogin }) => (
  <button className={css.google_btn} onClick={handleLogin}>
    <svg className={css.icon_google}>
      <use xlinkHref={`${sprite}#google`} />
    </svg>
    Sign in with Google
  </button>
);

GoogleButton.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default GoogleButton;
