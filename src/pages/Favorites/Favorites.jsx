import TeacherCard from 'components/TeacherCard/TeacherCard';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';
import Loader from 'components/Loader/Loader';
import { useEffect } from 'react';
import { auth } from 'server/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import { fetchFavorites } from '../../redux/favorite/favoriteOperation';
import useFavorites from 'hooks/useFavorites';
import useUpdateFavorites from 'hooks/useUpdateFavorites';
import css from './Favorites.module.css';

export default function Favorites() {
  const { updateFavorites, isFavoriteBtn } = useUpdateFavorites();
  const { favorites, isLoading, error } = useFavorites();
  const user = auth.currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user));
    }
  }, [user, dispatch]);

  const hasFavorites = favorites.length > 0;

  return (
    <Section>
      <Container>
        <div className={css.header}>
          <h1 className={css.title}>Saved tutors</h1>
          <p className={css.description}>
            Tutors you saved for later comparison and trial lesson planning.
          </p>
        </div>

        {isLoading && <Loader />}

        {!isLoading && error && (
          <p className={css.message}>
            We could not load your saved tutors. Please try again later.
          </p>
        )}

        {!isLoading && !error && !hasFavorites && (
          <p className={css.message}>
            You have not saved any tutors yet. Browse the catalogue and add
            tutors to compare them later.
          </p>
        )}

        {!isLoading && !error && hasFavorites && (
          <ul className={css.list}>
            {favorites.map(teacher => (
              <li key={teacher.id}>
                <TeacherCard
                  teacher={teacher}
                  isFavoriteBtn={isFavoriteBtn}
                  updateFavorites={updateFavorites}
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
