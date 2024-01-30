import { createSlice } from '@reduxjs/toolkit';
import { handleFulfilledFavorites } from './favoriteReducer';
import { fetchFavorites } from './favoriteOperation';

const initialState = {
  favorites: [],
  error: null,
  isLoading: true,
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
  },
  extraReducers: builder => {
    builder.addCase(fetchFavorites.fulfilled, handleFulfilledFavorites);
  },
});
export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
