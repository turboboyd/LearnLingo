import css from './LoadMore.module.css';


export default function LoadMore({hasMore, loadMore}) {
  return (
    <>
      {hasMore ? (
        <button
          className={`${css.btn} ${css.center}`}
          onClick={loadMore}
          type="button"
        >
          Load More
        </button>
      ) : (
        <p className={css.center}>Конец</p>
      )}
    </>
  );
}
