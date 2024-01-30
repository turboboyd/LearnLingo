export const handleFulfilledTeachers = (state, { payload }) => {
  state.teachers = payload;
  state.error = null;
  state.isLoading = false;
  state.status = 'fulfilled';
};
