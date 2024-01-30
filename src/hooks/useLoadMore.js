import { useCallback, useEffect, useState } from 'react';

export function useLoadMore(teachers) {
    
  const [currentPage, setCurrentPage] = useState(1);
  const [teachersToShow, setTeachersToShow] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const itemsPerPage = 4;

  const loadMore = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  useEffect(() => {
    const toShow = teachers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setTeachersToShow(prevData => [...prevData, ...toShow]);
    if (currentPage === Math.ceil(teachers.length / itemsPerPage)) {
      setHasMore(false);
    }
  }, [currentPage, itemsPerPage]);

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
