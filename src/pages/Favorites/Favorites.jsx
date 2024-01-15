import { useEffect, useState } from 'react';
import { auth, db, dbRef } from 'components/firebaseConfig.js';
import {
  get,
  child,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  ref,
  set,
} from 'firebase/database';
import { useFavorites } from 'pages/Teachers/useFavorites';
import TeacherCard from 'components/TeacherCard/TeacherCard';

export default function Favorites() {
   const { favorites, addToFavorites, isFavoriteBtn } = useFavorites();

  return (
    <div>
      {favorites.map(teacher => (
        <TeacherCard teacher={teacher} key={teacher.id} />
      ))}
    </div>
  );
}
