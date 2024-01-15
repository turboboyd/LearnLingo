import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../redux/auth/authOperation';

import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import Teachers from 'pages/Teachers/Teachers';
import Favorites from 'pages/Favorites/Favorites';
import { colors } from 'utils/colors';





export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

    const [randomStyle, setRandomStyle] = useState('');

    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      setRandomStyle(colors[randomIndex]);
    }, []);
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home randomStyle={randomStyle} />} />
          <Route
            index
            path="/teachers"
            element={<Teachers randomStyle={randomStyle} />}
          />
          <Route
            index
            path="/favorites"
            element={<Favorites randomStyle={randomStyle} />}
          />
        </Route>
      </Routes>
    </>
  );
};
