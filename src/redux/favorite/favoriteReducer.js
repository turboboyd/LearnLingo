export const handleFulfilledFavorites = (state, { payload }) => {
  state.favorites = payload;
  state.error = null;
  state.isLoading = false;
  state.status = 'fulfilled';
};
