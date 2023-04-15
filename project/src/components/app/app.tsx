import Main from '../../pages/main/main';
import {Route, Routes} from 'react-router-dom';
import React from 'react';
import Login from '../../pages/login/login';
import Room from '../../pages/room/room';
import Error from '../../pages/error/error';
import {AppRoute} from '../../const/const';
import {useAppSelector} from '../../hooks/util';
import LoadingScreen from '../loading-screen/loading-screen';
import browserHistory from '../../util/browser-history';
import HistoryRouter from '../history-route/history-route';
import {State} from '../../types/types';

const App = (): JSX.Element => {
  const {isOffersLoading}: State = useAppSelector((state: State) => state);

  if (isOffersLoading) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />}/>
        <Route path={AppRoute.Login} element={<Login />}/>
        <Route path={AppRoute.Offer} element={<Room />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </HistoryRouter>
  );
};

export default App;
