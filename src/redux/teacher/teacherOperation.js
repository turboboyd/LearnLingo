import { createAsyncThunk } from '@reduxjs/toolkit';
import { get, query, orderByKey, ref } from 'firebase/database';
import { db } from 'server/firebaseConfig.js';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { rejectWithValue }) => {
    try {
      const dbRef = ref(db, 'teachers/');
      const dataQuery = query(dbRef, orderByKey());

      const snapshot = await get(dataQuery);

      const data = snapshot.val();

      if (!data) {
        return [];
      }

      const result = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
