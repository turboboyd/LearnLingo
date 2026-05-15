import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  registrationUser,
  loginUser,
  currentUser,
  logoutUser,
  authorizationGoogle,
} from './authOperation';
import {
  handleFulfilledRegistration,
  handleFulfilledLogin,
  handleFulfilledLogOut,
  handleFulfilledCurrentUser,
  handleAuthorizationGoogle,
  handlePending,
  handleRejected,
} from './authReducer';
import { operationsType } from './authOperationsType';

const initialState = {
  user: {
    displayName: null,
    email: null,
    uid: null,
  },
  status: null,
  token: '',
  isVerify: false,
  isAuthCheck: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
  randomStyle: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRandomStyle: (state, action) => {
      state.randomStyle = action.payload;
    },
    clearAuthError: state => {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registrationUser.fulfilled, handleFulfilledRegistration)
      .addCase(loginUser.fulfilled, handleFulfilledLogin)
      .addCase(logoutUser.fulfilled, handleFulfilledLogOut)
      .addCase(currentUser.fulfilled, handleFulfilledCurrentUser)
      .addCase(authorizationGoogle.fulfilled, handleAuthorizationGoogle)
      .addMatcher(isAnyOf(...operationsType('pending')), handlePending)
      .addMatcher(isAnyOf(...operationsType('rejected')), handleRejected);
  },
});

export const { clearAuthError } = authSlice.actions;

export const authReducer = authSlice.reducer;
