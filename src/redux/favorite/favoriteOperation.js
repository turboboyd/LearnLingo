import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, ref } from 'firebase/database';
import { db } from 'server/firebaseConfig.js';

export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (user, { rejectWithValue }) => {
    try {
      const favoritesRefBase = ref(db, 'favorites/' + user.uid);
      const snapshot = await get(favoritesRefBase);
      const favorites = snapshot.val();

      if (!favorites) {
        return [];
      }

      return Object.values(favorites);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
