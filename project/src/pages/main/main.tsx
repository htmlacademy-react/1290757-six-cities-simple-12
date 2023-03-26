import Header from '../../components/header/header';
import PlaceList from '../../components/place-list/place-list';
import React, {useEffect} from 'react';
import Map from '../../components/map/map';
import {CITY} from '../../mocks/city';
import {POINTS} from '../../mocks/points';
import getPlacesFromOffers from '../../util/util';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {State} from '../../store/reducer';
import {updateOffers} from '../../store/action';

const Main = (): JSX.Element => {
  const {city, offers}: State = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateOffers());
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header isAuth isMain/>

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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
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
