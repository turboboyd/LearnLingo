import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'server/firebaseConfig';
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

export const getAuthErrorMessage = error => {
  const code = error?.code;

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-login-credentials':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email or password is incorrect. Please check your credentials and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists. Please log in instead.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please wait a moment and try again.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before completion.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
    case 'auth/invalid-api-key':
      return 'Authentication is not configured correctly. Please check the Firebase environment variables.';
    default:
      return error?.message || 'Authentication failed. Please try again.';
  }
};

const mapUser = user => ({
  displayName: user.displayName,
  email: user.email,
  uid: user.uid,
  accessToken: user.accessToken,
});

export const registrationUser = createAsyncThunk(
  'auth/registrationUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      return mapUser(userCredential.user);
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      return mapUser(userCredential.user);
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { rejectWithValue }) => {
    try {
      return await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          user => {
            unsubscribe();
            resolve(user ? mapUser(user) : null);
          },
          error => {
            unsubscribe();
            reject(error);
          }
        );
      });
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  }
);

export const authorizationGoogle = createAsyncThunk(
  'auth/authorizationGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      return mapUser(userCredential.user);
    } catch (error) {
      return rejectWithValue(getAuthErrorMessage(error));
    }
  }
);
