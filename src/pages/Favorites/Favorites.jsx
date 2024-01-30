import TeacherCard from 'components/TeacherCard/TeacherCard';
import { useLoadMore } from 'hooks/useLoadMore';
import LoadMore from 'components/Button/LoadMore';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import { useEffect, useCallback } from 'react';
import { ref, update, remove } from 'firebase/database';
import { auth, db } from 'server/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { fetchFavorites } from '../../redux/favorite/favoriteOperation';
import {
  addFavorite,
  removeFavorite,
} from '../../redux/favorite/favoriteSlice';
import useFavorites from 'hooks/useFavorites';

export default function Favorites() {
  const { favorites } = useFavorites();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const favoritesRefBase = ref(db, 'favorites/' + user.uid);


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
      update(favoritesRefBase, { [teacher.id]: teacher });
      dispatch(addFavorite(teacher));
    }
  };

  const { teachersToShow, hasMore, loadMore } = useLoadMore(favorites);

  return (
    <Section>
      <Container>
        {favorites.map(teacher => (
          <TeacherCard
            teacher={teacher}
            isFavoriteBtn={isFavoriteBtn}
            updateFavorites={updateFavorites}
            key={teacher.id}
          />
        ))}
        <LoadMore
          hasMore={hasMore}
          loadMore={loadMore}
          teachersToShow={teachersToShow}
          text="Your Favorites List is empty"
        />
      </Container>
    </Section>
  );
}
