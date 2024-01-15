import React, { useState } from 'react';
import css from './TeacherCard.module.css';
import sprite from 'images/InlineSprite.svg';
import Reviews from 'components/Reviews/Reviews';
import TeacherInfo from 'components/TeacherInfo/TeacherInfo';
import { useFavorites } from 'pages/Teachers/useFavorites';

const TeacherCard = ({ teacher }) => {
  const { addToFavorites, isFavoriteBtn } = useFavorites();
  const [expandedReviews, setExpandedReviews] = useState({});
  return (
    <article className={css.wrap_teacher} key={teacher.id}>
      <figure className={css.avatar}>
        <span></span>
        <img src={teacher.avatar_url} alt="Avatar_teacher" />
      </figure>
      <div className={css.teacher_info}>
        <div className={css.teacher_wrap}>
          <span className={css.servis_span}>Languages</span>
          <ul className={css.teacher_statics}>
            <li className={css.static_after}>
              <svg className={css.icon_book}>
                <use xlinkHref={`${sprite}#book`} />
              </svg>
              <p>Lessons online</p>
            </li>
            <li className={css.static_after}>
              <p>Lessons done: {teacher.lessons_done}</p>
            </li>
            <li className={`${css.rating} ${css.static_after}`}>
              <svg className={css.icon}>
                <use xlinkHref={`${sprite}#star`} />
              </svg>
              <p>Rating: {teacher.rating}</p>
            </li>
            <li>
              {' '}
              <p>
                Price / 1 hour:{' '}
                <span className={css.price}>{teacher.price_per_hour}$</span>
              </p>
            </li>
          </ul>
          <button
            className={css.btn_heart}
            type="button"
            onClick={() => addToFavorites(teacher)}
          >
            <svg
              className={
                isFavoriteBtn(teacher)
                  ? `${css.icon_heart} ${css.active}`
                  : `${css.icon_heart}`
              }
            >
              <use xlinkHref={`${sprite}#heart`} />
            </svg>
          </button>
        </div>
        <TeacherInfo teacher={teacher} />
        <Reviews
          reviews={teacher.reviews}
          id={teacher.id}
          expandedReviews={expandedReviews}
          setExpandedReviews={setExpandedReviews}
        />

        <div className={css.level_wrap}>
          {teacher.levels.map((level, index) => (
            <h3 className={css.level} key={index}>
              #{level}
            </h3>
          ))}
        </div>

        {expandedReviews[teacher.id] && (
          <button
            className={css.btn}
            type="button"
          >
            Book trial lesson
          </button>
        )}
      </div>
    </article>
  );
};

export default TeacherCard;
