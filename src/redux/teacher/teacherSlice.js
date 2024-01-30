import { createSlice } from '@reduxjs/toolkit';
import { handleFulfilledTeachers } from './teacherReducer';
import { fetchTeachers } from './teacherOperation';

const initialState = {
  teachers: [],
  error: null,
  isLoading: true,
  status: null,
};

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTeachers.fulfilled, handleFulfilledTeachers);
  },
});


export const teachersReducer = teacherSlice.reducer;

