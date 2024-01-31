import FavoriteButton from '../FavoriteButton/FavoriteButton';
import css from './TeacherStats.module.css';
import sprite from 'images/InlineSprite.svg';

export const TeacherStats = ({
  teacher,
  isFavoriteBtn,
  randomStyle,
  handleAddToFavorites,
}) => (
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
      <span className={css.favorit_position}>
        <FavoriteButton
          isFavorite={isFavoriteBtn(teacher)}
          randomStyle={randomStyle}
          handleAddToFavorites={handleAddToFavorites}
        />
      </span>
    </div>
  </div>
);
