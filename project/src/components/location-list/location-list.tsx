import React, {SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {updateCity} from '../../store/action';
import {State} from '../../store/reducer';
import {CityName} from "../../const/const";

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
      {LOCATION_LIST.map((city: CityName): JSX.Element => getLocationElement(city))}
    </ul>
  );
};

export default LocationList;
