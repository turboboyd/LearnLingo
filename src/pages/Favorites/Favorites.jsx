import TeacherCard from 'components/TeacherCard/TeacherCard';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import { useEffect } from 'react';
import { auth } from 'server/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { fetchFavorites } from '../../redux/favorite/favoriteOperation';
import useFavorites from 'hooks/useFavorites';
import useUpdateFavorites from 'hooks/useUpdateFavorites';

export default function Favorites() {
  const { updateFavorites, isFavoriteBtn } = useUpdateFavorites();
  const { favorites } = useFavorites();
  const user = auth.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user));
    }
  }, [user, dispatch]);


  return (
    <Section>
      <Container>
        <h1>Favorites</h1>
        {favorites.map(teacher => (
          <TeacherCard
            teacher={teacher}
            isFavoriteBtn={isFavoriteBtn}
            updateFavorites={updateFavorites}
            key={teacher.id}
          />
        ))}
        <p>Your Favorites List is empty</p>
      </Container>
    </Section>
  );
}
