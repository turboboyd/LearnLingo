import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { registrationUser, loginUser, currentUser, logoutUser } from './authOperation';
import {
  handleFulfilledRegistration,
  handleFulfilledLogin,
  handleFulfilledLogOut,
  handleFulfilledCurrentUser,
  handlePending,
  handleRejected,
//   handleFulfilledVerify,
//   handleVerifyRejected,
//   handleFulfilledUpdateProfileSettings,
//   handlePendingUpdateProfileSettings,
//   handleRejectedUpdateProfileSettings,
//   handlePendingRefresh,
//   handleFulfilledResetEmail,
//   handleFulfilledResetPassword,
} from './authReducer';
import { operationsType } from './authOperationsType';


const contactsInitialState = {
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
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(registrationUser.fulfilled, handleFulfilledRegistration)
      .addCase(loginUser.fulfilled, handleFulfilledLogin)
      .addCase(logoutUser.fulfilled, handleFulfilledLogOut)
      .addCase(currentUser.fulfilled, handleFulfilledCurrentUser)
      // .addCase(refreshUser.pending, handlePendingRefresh)
    //   .addCase(verifyUser.rejected, handleVerifyRejected)
      .addMatcher(isAnyOf(...operationsType('pending')), handlePending)
      .addMatcher(isAnyOf(...operationsType('rejected')), handleRejected);
  },
});

export const authReducer = authSlice.reducer;
