import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FAVORITES_ROUTE, HOME_ROUTE, TEACHERS_ROUTE } from 'utils/const';
import css from './Header.module.css';
import BasicModal from 'components/Modal/BasicModal';
import AuthModal from 'components/AuthModal/AuthModal';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authOperation';
import sprite from 'images/InlineSprite.svg';

export default function Header() {
  const dispatch = useDispatch();
  const [modalContent, setModalContent] = useState(null);
  // const [isModalOpen, setModalOpen] = useState(false);
  const { user, IsAuthCheck } = useAuth();

  const openModal = content => {
    setModalContent(content);
  };
  // const isModal = () => {
  //   setModalOpen(!isModalOpen);
  // };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={css.header}>
      <Link className={css.logo} to={HOME_ROUTE}>
        <svg className={css.icon}>
          <use xlinkHref={`${sprite}#ukraine`} />
        </svg>
        <p className={css.logo_title}>LearnLingo</p>
      </Link>
      <nav>
        <ul className={css.list_nav}>
          {!IsAuthCheck && (
            <li>
              <Link to={HOME_ROUTE}>Home</Link>
            </li>
          )}
          <li>
            <Link to={TEACHERS_ROUTE}>Teachers</Link>
          </li>
          {IsAuthCheck && (
            <li>
              <Link to={FAVORITES_ROUTE}>Favorites</Link>
            </li>
          )}
        </ul>
      </nav>
      {IsAuthCheck ? (
        <div className={css.list_btn}>
          <p className={css.name}>Hallo {user.displayName}</p>{' '}
          <button className={css.btn} onClick={handleLogout}>
            logOut
          </button>
        </div>
      ) : (
        <ul className={css.list_btn}>
          <li>
            <button
              className={css.btn_login}
              onClick={() => openModal('login')}
            >
              Log in
            </button>
          </li>
          <li>
            <button
              className={css.btn}
              onClick={() => openModal('registration')}
            >
              Registration
            </button>
          </li>
        </ul>
      )}

      {modalContent && (
        <BasicModal isModal={() => setModalContent(null)}>
          <AuthModal
            modalContent={modalContent}
            isModal={() => setModalContent(null)}
          />
        </BasicModal>
      )}
    </header>
  );
}
