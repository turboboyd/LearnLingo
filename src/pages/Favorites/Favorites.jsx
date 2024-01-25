import { useFavorites } from 'hooks/useFavorites';
import TeacherCard from 'components/TeacherCard/TeacherCard';
import { useLoadMore } from 'hooks/useLoadMore';
import LoadMore from 'components/Button/LoadMore';
import Section from 'components/Section/Section';
import Container from 'components/Container/Container';

export default function Favorites() {
  const { favorites } = useFavorites();
  const { teachersToShow, hasMore, loadMore } = useLoadMore(favorites);
  return (
    <Section>
      <Container>
        {teachersToShow.map(teacher => (
          <TeacherCard teacher={teacher} key={teacher.id} />
        ))}
        {teachersToShow.length > 0 ? (
          <LoadMore hasMore={hasMore} loadMore={loadMore} />
        ) : (
          <p>Your Favorites List is empty</p>
        )}
      </Container>
    </Section>
  );
}
