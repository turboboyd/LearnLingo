import css from './LoadMore.module.css';
import { useSelector } from 'react-redux';
import { selectRandomStyle } from '../../redux/auth/authSelectors';


export default function LoadMore({ hasMore, loadMore }) {
  const randomStyle = useSelector(selectRandomStyle);
  return (
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
        <p className={css.center}>The list of teachers is over.</p>
      )}
    </>
  );
}
