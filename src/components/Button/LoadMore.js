import css from './LoadMore.module.css';


export default function LoadMore({ hasMore, loadMore, randomStyle }) {
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
        <p className={css.center}>Конец</p>
      )}
    </>
  );
}
