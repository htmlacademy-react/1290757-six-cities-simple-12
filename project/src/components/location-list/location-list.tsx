import React, {SyntheticEvent} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {updateCity} from '../../store/action';
import {CityName, LOCATION_LIST} from '../../const/const';
import {CityState, State} from '../../types/state';

const LocationList = (): JSX.Element => {
  const {city}: CityState = useAppSelector((state: State) => state.cityReducer);
  const dispatch = useAppDispatch();

  const getLocationElement = (currentCity: CityName): JSX.Element => {
    const handleLocationClick = (event: SyntheticEvent): void => {
      event.preventDefault();
      dispatch(updateCity(currentCity));
    };

    return (
      <li className="locations__item" key={Math.random() * Number.MAX_VALUE}>
        <a
          className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
          href="#"
          onClick={handleLocationClick}
        >
          <span>{currentCity}</span>
        </a>
      </li>
    );
  };

  return (
    <ul className="locations__list tabs__list">
      {LOCATION_LIST.map((currentCity: CityName): JSX.Element => getLocationElement(currentCity))}
    </ul>
  );
};

export default React.memo(LocationList);
