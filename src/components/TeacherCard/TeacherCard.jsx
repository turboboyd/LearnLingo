import React, { useState } from 'react';
import css from './TeacherCard.module.css';
import {
  TeacherAvatar,
  TeacherStats,
  TeacherLevels,
  BookTrialLessonButton,
} from './index';

import Reviews from 'components/Reviews/Reviews';
import TeacherInfo from 'components/TeacherInfo/TeacherInfo';
import { useFavorites } from 'hooks/useFavorites.1js';
import useAuth from 'hooks/useAuth';
import BasicModal from 'components/Modal/BasicModal';
import AuthForm from 'components/Form/AuthForm/AuthModal';
import useModal from 'hooks/useModal';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../redux/auth/authSelectors';
import TrialLessonForm from 'components/Form/TrialLessonForm/TrialLessonForm';

const TeacherCard = ({
  teacher,
  isFavoriteBtn,
  updateFavorites,
  selectedLevel = teacher.levels[0],
}) => {
  const { user } = useAuth();
  const [expandedReviews, setExpandedReviews] = useState({});
  const { modalContent, isModalOpen, openModal, closeModal } = useModal();
  const randomStyle = useSelector(selectRandomStyle);

  const handleAddToFavorites = () => {
    if (user.email) {
      updateFavorites(teacher);
    } else {
      openModal('registration');
    }
  };

  return (
    <article className={css.wrap_teacher} key={teacher.id}>
      <TeacherAvatar teacher={teacher} />
      <div className={css.teacher_info}>
        <TeacherStats
          teacher={teacher}
          isFavoriteBtn={isFavoriteBtn}
          randomStyle={randomStyle}
          handleAddToFavorites={handleAddToFavorites}
        />
        <TeacherInfo teacher={teacher} />
        <Reviews
          reviews={teacher.reviews}
          id={teacher.id}
          expandedReviews={expandedReviews}
          setExpandedReviews={setExpandedReviews}
        />
        <TeacherLevels
          teacher={teacher}
          selectedLevel={selectedLevel}
          randomStyle={randomStyle}
        />
        <BookTrialLessonButton
          expanded={expandedReviews[teacher.id]}
          randomStyle={randomStyle}
          openModal={() => openModal('Book trial lesson')}
        />
      </div>
      {isModalOpen && (
        <BasicModal isModal={closeModal}>
          {modalContent === 'registration' && (
            <AuthForm modalContent="registration" isModal={closeModal} />
          )}
          {modalContent === 'Book trial lesson' && (
            <TrialLessonForm closeModal={closeModal} teacher={teacher} />
          )}
        </BasicModal>
      )}
    </article>
  );
};

export default TeacherCard;
