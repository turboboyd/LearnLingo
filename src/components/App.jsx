import { Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout';
import Home from 'pages/Home/Home';
import Teachers from 'pages/Teachers/Teachers';

export const App = () => {

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
