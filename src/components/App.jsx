import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../redux/auth/authOperation';

import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import Teachers from 'pages/Teachers/Teachers';
import Favorites from 'pages/Favorites/Favorites';
import { colors } from 'utils/colors';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import { authSlice } from '../redux/auth/authSlice';






export const App = () => {
  const dispatch = useDispatch();
 const { setRandomStyle } = authSlice.actions;

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    dispatch(setRandomStyle(colors[randomIndex]));
  }, [dispatch, setRandomStyle]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            path="/"
            element={
              <AuthRoute element={Home} />
            }
          />
          <Route
            index
            path="/teachers"
            element={<Teachers />}
          />
          <Route
            index
            path="/favorites"
            element={
              <PrivateRoute element={Favorites} />
            }
          />
        </Route>
      </Routes>
    </>
  );
};
