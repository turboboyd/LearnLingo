import {} from 'firebase/database';
import { useFavorites } from 'pages/Teachers/useFavorites';
import TeacherCard from 'components/TeacherCard/TeacherCard';

export default function Favorites({ randomStyle }) {
  const { favorites } = useFavorites();

  return (
    <div>
      {favorites.map(teacher => (
        <TeacherCard
          teacher={teacher}
          key={teacher.id}
          randomStyle={randomStyle}
        />
      ))}
    </div>
  );
}
