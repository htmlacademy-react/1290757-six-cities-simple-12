import React, {SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {updateCity} from '../../store/action';
import {CityName} from '../../const/const';
import {State} from '../../types/types';


const LOCATION_LIST: CityName[] = [CityName.Paris, CityName.Cologne, CityName.Brussels, CityName.Amsterdam, CityName.Hamburg, CityName.Dusseldorf];

const LocationList = (): JSX.Element => {
  const city: CityName = useAppSelector((state: State) => state.city);
  const dispatch = useAppDispatch();

  const getLocationElement = (currentCity: CityName): JSX.Element => (
    <li className="locations__item" key={Math.random() * Number.MAX_VALUE}>
      <a
        className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={(event: SyntheticEvent) => {
          event.preventDefault();
          dispatch(updateCity(currentCity));
        }}
      >
        <span>{currentCity}</span>
      </a>
    </li>
  );

  return (
    <ul className="locations__list tabs__list">
      {LOCATION_LIST.map((currentCity: CityName): JSX.Element => getLocationElement(currentCity))}
    </ul>
  );
};

export default LocationList;
