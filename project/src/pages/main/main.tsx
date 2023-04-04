import Header from '../../components/header/header';
import PlaceList from '../../components/place-list/place-list';
import React, {useEffect} from 'react';
import Map from '../../components/map/map';
import {CITY} from '../../mocks/city';
import {POINTS} from '../../mocks/points';
import {getPlacesFromOffers} from '../../util/util';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {State} from '../../store/reducer';
import {getOffers} from '../../store/action';
import Sorting from '../../components/sorting/sorting';

const Main = (): JSX.Element => {
  const {city, offers}: State = useAppSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header isMain/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <Sorting />
              <PlaceList places={getPlacesFromOffers(offers)} type='cities' />
            </section>
            <div className="cities__right-section">
              <Map city={CITY} points={POINTS} selectedPoint={POINTS[0]} type='cities' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
