import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE, TEACHERS_ROUTE, FAVORITES_ROUTE } from 'utils/const';
import css from './Header.module.css';
import BasicModal from 'components/Modal/BasicModal';

export default function Header() {
  const [isModalOpen, setModalOpen] = useState(false);

  const isModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <header className={css.header}>
      <Link to={HOME_ROUTE}>
        <p>LOGO</p>
        <p className={css.logo_title}>LearnLingo</p>
      </Link>
      <nav>
        <ul className={css.list_nav}>
          <li>
            <Link to={HOME_ROUTE}>Home</Link>
          </li>
          <li>
            <Link to={TEACHERS_ROUTE}>Teachers</Link>
          </li>
        </ul>
      </nav>

      <ul className={css.list_btn}>
        <li>
          <button className={css.btn_login} onClick={isModal}>
            Log in
          </button>
        </li>
        <li>
          <button className={css.btn} onClick={isModal}>
            Registration
          </button>
        </li>
      </ul>
      {isModalOpen === true && (
        <BasicModal isModal={isModal}>
          <p>Your modal content goes here</p>
        </BasicModal>
      )}
    </header>
  );
}
