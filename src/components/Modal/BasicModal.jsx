import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './BasicModal.module.css';
// import CloseButton from 'components/Button/CloseButton/CloseButton';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function BasicModal({ isModal, children }) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      isModal();
    }
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      isModal();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        {/* <CloseButton isModal={isModal} /> */}
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default BasicModal;

BasicModal.propTypes = {
  isModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
