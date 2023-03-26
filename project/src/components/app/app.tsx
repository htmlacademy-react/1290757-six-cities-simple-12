import Main from '../../pages/main/main';
import {BrowserRouter, generatePath, Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Error from '../../pages/error/error';
import {AppRoute, Comment, Offer} from '../../types/types';

type AppProps = {
  offers: Offer[];
  reviews: Comment[];
}

const App = ({offers, reviews}: AppProps): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main />} />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route path={generatePath(AppRoute.Offer, {id: '1'})} element={<Room offers={offers} reviews={reviews} />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

export default App;
