import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../redux/auth/authOperation';

import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import Teachers from 'pages/Teachers/Teachers';



export const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route index path="/teachers" element={<Teachers />} />
        </Route>
      </Routes>
    </>
  );
};
