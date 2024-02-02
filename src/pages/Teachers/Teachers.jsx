import { useEffect, useState } from 'react';
import LoadMore from 'components/Button/LoadMore';
import Filter from 'components/Filter/Filter';
import TeacherCard from 'components/TeacherCard/TeacherCard';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import { useDispatch } from 'react-redux';
import { fetchTeachers } from '../../redux/teacher/teacherOperation';
import { fetchFavorites } from '../../redux/favorite/favoriteOperation';
import useTeachers from 'hooks/useTeachers';
import { useLoadMore } from 'hooks/useLoadMore';
import useUpdateFavorites from 'hooks/useUpdateFavorites';
import css from './Teachers.module.css';
import useAuth from 'hooks/useAuth';


export default function Teachers() {
  const dispatch = useDispatch();
  const { user, } = useAuth();
  
  const { updateFavorites, isFavoriteBtn } = useUpdateFavorites();
  const { teachers, status } = useTeachers();
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [selectedLevel, setSelectedLevel] = useState('A1 Beginner');
  const {
    teachersToShow,
    hasMore,
    loadMore,
    setTeachersToShow,
    setHasMore,
    setCurrentPage,
  } = useLoadMore(filteredTeachers);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <Section>
      <Container>
        <h1 className={css.title}>Teachers</h1>
        <Filter
          teachers={teachers}
          setFilteredTeachers={setFilteredTeachers}
          setTeachersToShow={setTeachersToShow}
          setCurrentPage={setCurrentPage}
          setHasMore={setHasMore}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
        {status === 'fulfilled' && (
          <div>
            {teachersToShow.map(teacher => (
              <TeacherCard
                teacher={teacher}
                key={teacher.id}
                selectedLevel={selectedLevel}
                isFavoriteBtn={isFavoriteBtn}
                updateFavorites={updateFavorites}
              />
            ))}
            <LoadMore
              hasMore={hasMore}
              loadMore={loadMore}
              teachersToShow={teachersToShow}
              text="We didn't find anything matching your request."
            />
          </div>
        )}
      </Container>
    </Section>
  );
}
