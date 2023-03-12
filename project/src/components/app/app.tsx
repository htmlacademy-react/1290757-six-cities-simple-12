import Main from '../../pages/main/main';
import {BrowserRouter, generatePath, Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Error from '../../pages/error/error';
import {AppRoute} from '../../types/types';

type AppProps = {
  placesFound: number;
}

const App = ({placesFound}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main placesFound={placesFound} />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={generatePath(AppRoute.Offer, {id: '1'})} element={<Room />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
