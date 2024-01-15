import { useCallback, useEffect, useState } from 'react';
import LoadMore from 'components/Button/LoadMore';
import Filter from 'components/Filter/Filter';
import TeacherCard from 'components/TeacherCard/TeacherCard';
import { fetchTeachers } from 'server/fetchTeachers';

export default function Teachers({ randomStyle }) {
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [TeachersToShow, setTeachersToShow] = useState([]);

  const itemsPerPage = 4;

  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  useEffect(() => {
    fetchTeachers().then(teachers => setTeachers(teachers));
  }, []);

  useEffect(() => {
    const toShow = filteredTeachers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setTeachersToShow(prevData => [...prevData, ...toShow]);
    if (currentPage === Math.ceil(filteredTeachers.length / itemsPerPage)) {
      setHasMore(false);
    }
  }, [filteredTeachers, currentPage]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);

  return (
    <>
      <Filter
        teachers={teachers}
        setFilteredTeachers={setFilteredTeachers}
        setTeachersToShow={setTeachersToShow}
        setCurrentPage={setCurrentPage}
        setHasMore={setHasMore}
      />
      <div>
        {TeachersToShow.map(teacher => (
          <TeacherCard teacher={teacher} key={teacher.id} randomStyle={randomStyle} />
        ))}

        <LoadMore
          hasMore={hasMore}
          loadMore={loadMore}
          randomStyle={randomStyle}
        />
      </div>
    </>
  );
}
