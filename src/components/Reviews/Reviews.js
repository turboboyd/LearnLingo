import css from './Reviews.module.css';
import sprite from '../../images/InlineSprite.svg';

export default function Reviews({ id, reviews, expandedReviews, setExpandedReviews }) {
  const toggleReviews = index => {
    setExpandedReviews(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      {expandedReviews[id] ? (
        <div className={css.review}>
          {reviews.map((review, reviewIndex) => (
            <div className={css.review} key={reviewIndex}>
              <h3 className={css.name}>{review.reviewer_name}</h3>
              <div className={css.rating}>
                <svg className={css.icon}>
                  <use xlinkHref={`${sprite}#star`} />
                </svg>
                <p>{review.reviewer_rating}.0</p>
              </div>
              <p className={css.text}>{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <button
          className={css.btn_read}
          type="button"
          onClick={() => toggleReviews(id)}
        >
          Read more
        </button>
      )}
    </>
  );
}
