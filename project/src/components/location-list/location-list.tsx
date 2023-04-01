import React, {SyntheticEvent} from 'react';
import {CITY_LIST} from '../../mocks/city';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {updateCity, updateOffers} from '../../store/action';
import {State} from '../../store/reducer';
const LocationList = (): JSX.Element => {
  const currentCity: string = useAppSelector((state: State) => state.city);
  const dispatch = useAppDispatch();

  const getLocationElement = (city: string): JSX.Element => (
    <li className="locations__item" key={Math.random() * Number.MAX_VALUE}>
      <a
        className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={(event: SyntheticEvent) => {
          event.preventDefault();
          dispatch(updateCity(city));
          dispatch(updateOffers());
        }}
      >
        <span>{city}</span>
      </a>
    </li>
  );

  return (
    <ul className="locations__list tabs__list">
      {CITY_LIST.map((city: string): JSX.Element => getLocationElement(city))}
    </ul>
  );
};

export default LocationList;
