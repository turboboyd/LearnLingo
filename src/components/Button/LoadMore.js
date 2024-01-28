import css from './LoadMore.module.css';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../redux/auth/authSelectors';


export default function LoadMore({ hasMore, loadMore, teachersToShow, text }) {

  const randomStyle = useSelector(selectRandomStyle);
  return (
    <>
      {teachersToShow.length > 0 ? (
        <>
          {hasMore ? (
            <button
              className={`${css.btn} ${css.center}`}
              onClick={loadMore}
              type="button"
              style={{ backgroundColor: randomStyle.btn }}
            >
              Load More
            </button>
          ) : (
            <p className={css.text}>The list of teachers is over.</p>
          )}
        </>
      ) : (
        <p className={css.text}>{text}</p>
      )}
    </>
  );
}
