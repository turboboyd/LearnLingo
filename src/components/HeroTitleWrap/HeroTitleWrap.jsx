import AuthModal from 'components/Form/AuthForm/AuthModal';
import css from './HeroTitleWrap.module.css';
import BasicModal from 'components/Modal/BasicModal';
import useModal from 'hooks/useModal';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../redux/auth/authSelectors';

export default function HeroTitleWrap() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const randomStyle = useSelector(selectRandomStyle);
  return (
    <div className={css.wrap_title}>
      <h1 className={css.title}>
        Unlock your potential with the best{' '}
        <span
          className={`${css.title_span}`}
          style={{ backgroundColor: randomStyle.background }}
        >
          language
        </span>{' '}
        tutors
      </h1>
      <p className={css.text}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button
        className={`${css.btn} ${css[randomStyle.name]}`}
        style={{
          '--color-btn': randomStyle.btn,
          '--active-color-btn': randomStyle.background,
        }}
        onClick={openModal}
      >
        Get started
      </button>
      {isModalOpen && (
        <BasicModal isModal={closeModal}>
          <AuthModal modalContent="registration" isModal={closeModal} />
        </BasicModal>
      )}
    </div>
  );
}
