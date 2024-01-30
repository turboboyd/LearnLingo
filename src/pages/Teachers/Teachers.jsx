import { useCallback, useEffect, useState } from 'react';
import LoadMore from 'components/Button/LoadMore';
import Filter from 'components/Filter/Filter';
import TeacherCard from 'components/TeacherCard/TeacherCard';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import { ref, update, remove } from 'firebase/database';
import { auth, db } from 'server/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { fetchTeachers } from '../../redux/teacher/teacherOperation';
import { fetchFavorites } from '../../redux/favorite/favoriteOperation';
import useTeachers from 'hooks/useTeachers';
import { useLoadMore } from 'hooks/useLoadMore';
import {
  addFavorite,
  removeFavorite,
} from '../../redux/favorite/favoriteSlice';
import useFavorites from 'hooks/useFavorites';

export default function Teachers() {
  const dispatch = useDispatch();

  const { teachers, status } = useTeachers();
  const { favorites } = useFavorites();
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [selectedLevel, setSelectedLevel] = useState('A1 Beginner');
  useEffect(() => {
    setFilteredTeachers(teachers);
  }, [teachers]);


  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);
  const {
    teachersToShow,
    hasMore,
    loadMore,
    setTeachersToShow,
    setHasMore,
    setCurrentPage,
  } = useLoadMore(filteredTeachers);
  const user = auth.currentUser;

  const isFavoriteBtn = useCallback(
    teacher => {
      return favorites.some(favTeacher => favTeacher.id === teacher.id);
    },
    [favorites]
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user));
    }
  }, [user, dispatch]);

  const updateFavorites = teacher => {
    if (!user) {
      console.log('ВОЙДИТЕ В СИСТЕМУ');
      return;
    }

    const isFavorited = isFavoriteBtn(teacher);

    if (isFavorited) {
      remove(ref(db, 'favorites/' + user.uid + '/' + teacher.id));
      dispatch(removeFavorite(teacher.id));
    } else {
      const favoritesRefBase = ref(db, 'favorites/' + user.uid);
      update(favoritesRefBase, { [teacher.id]: teacher });
      dispatch(addFavorite(teacher));
    }
  };
  return (
    <Section>
      <Container>
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
