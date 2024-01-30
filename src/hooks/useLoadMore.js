import { useCallback, useEffect, useState } from 'react';

export function useLoadMore(teachers) {
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersToShow, setTeachersToShow] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 4;

  const loadMore = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);
  const checkHasMore = (teachers, currentPage) => {
    if (currentPage === Math.ceil(teachers.length / itemsPerPage)) {
      setHasMore(false);
    }
  };
  useEffect(() => {

    if (currentPage === 1) {
      const toShow = teachers.slice(0, itemsPerPage);
      setTeachersToShow(toShow);
    } else {
      const toShow = teachers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setTeachersToShow(prevData => [...prevData, ...toShow]);
    }
    checkHasMore(teachers, currentPage);
  }, [teachers, currentPage]);

  return {
    teachersToShow,
    setTeachersToShow,
    currentPage,
    setCurrentPage,
    hasMore,
    loadMore,
    setHasMore,
  };
}
