import { createSlice } from '@reduxjs/toolkit';
import { handleFulfilledFavorites } from './favoriteReducer';
import { fetchFavorites } from './favoriteOperation';

const initialState = {
  favorites: [],
  error: null,
  isLoading: false,
  status: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        teacher => teacher.id !== action.payload
      );
    },
    clearFavorites: state => {
      state.favorites = [];
      state.error = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, state => {
        state.error = null;
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(fetchFavorites.fulfilled, handleFulfilledFavorites)
      .addCase(fetchFavorites.rejected, (state, { payload }) => {
        state.error = payload || 'Failed to load saved tutors';
        state.isLoading = false;
        state.status = 'rejected';
      });
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
