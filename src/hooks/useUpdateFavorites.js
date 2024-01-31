import { useCallback } from 'react';
import { ref, update, remove } from 'firebase/database';
import { auth, db } from 'server/firebaseConfig.js';
import { useDispatch } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../redux/favorite/favoriteSlice';
import useFavorites from 'hooks/useFavorites';

export default function useUpdateFavorites() {
  const dispatch = useDispatch();
  const { favorites } = useFavorites();
  const user = auth.currentUser;

  const isFavoriteBtn = useCallback(
    teacher => {
      return favorites.some(favTeacher => favTeacher.id === teacher.id);
    },
    [favorites]
  );

  const updateFavorites = useCallback(
    teacher => {
      if (!user) {
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
    },
    [user, isFavoriteBtn, dispatch]
  );

  return { updateFavorites, isFavoriteBtn };
}
