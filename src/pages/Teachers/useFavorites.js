import { useState, useEffect } from 'react';
import { get, ref, update, remove } from 'firebase/database';
import { auth, db } from 'components/firebaseConfig.js';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const user = auth.currentUser;

  const isFavoriteBtn = teacher => {
    return favorites.some(favTeacher => favTeacher.id === teacher.id);
  };
  const addToFavorites = teacher => {
    updateFavorites(teacher);
  };

  const updateFavorites = teacher => {
    if (user) {
      setFavorites(prevFavorites => {
        const newFavorites = getUpdatedFavorites(prevFavorites, teacher);
        return newFavorites;
      });
    } else {
      console.log("ВОЙДИТЕ В СИСТЕМУ")
    }
  };

  const getUpdatedFavorites = (prevFavorites, teacher) => {

    const favoritesRef = ref(db, 'favorites/' + user.uid);

    const isFavorited = prevFavorites.some(
      favTeacher => favTeacher.id === teacher.id
    );

    if (isFavorited) {
      remove(ref(db, 'favorites/' + user.uid + '/' + teacher.id));
      return prevFavorites.filter(favTeacher => favTeacher.id !== teacher.id);
    } else {
      update(favoritesRef, { [teacher.id]: teacher });
      return [...prevFavorites, teacher];
    }
  };

  const getFavorites = async () => {
    const favoritesRef = ref(db, 'favorites/' + user.uid);
    const snapshot = await get(favoritesRef);
    if (snapshot.exists()) {
      setFavorites(Object.values(snapshot.val()));
    } else {
      console.log('No data available');
    }
  };

  useEffect(() => {
    if (user) {
      getFavorites();
    }
  }, []);

  return { favorites, addToFavorites, isFavoriteBtn };
}
