import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'components/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const googleAuthProvider = new GoogleAuthProvider();

export const registrationUser = createAsyncThunk(
  'user/registrationUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        accessToken: userCredential.user.accessToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        accessToken: userCredential.user.accessToken,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, currentUser => {
          if (currentUser) {
            const user = {
              displayName: currentUser.displayName,
              email: currentUser.email,
              uid: currentUser.uid,
              accessToken: currentUser.accessToken,
            };
            resolve(user);
          } else {
            return reject('Пользователь не аутентифицирован');
          }
        });
      });
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const authorizationGoogle = createAsyncThunk(
  'auth/authorizationGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      return {
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        accessToken: userCredential.user.accessToken,
      };
    } catch (error) {
      console.error('Login error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

