import {
  registrationUser,
  loginUser,
  currentUser,
  logoutUser,
} from './authOperation';

const operationsThunk = [registrationUser, loginUser, currentUser, logoutUser];
export const operationsType = type =>
  operationsThunk.map(operation => operation[type]);
