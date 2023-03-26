import React from 'react';
import {CITY_LIST} from '../../mocks/city';
import {useAppSelector} from '../../hooks/util';
import Location from '../location/location';
import {State} from '../../types/state';

const LocationList = (): JSX.Element => {
  const currentCity = useAppSelector((state: State) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITY_LIST.map((city: string): JSX.Element => <Location key={Math.random() * Number.MAX_VALUE} city={city} isActive={city === currentCity} />)}
    </ul>
  );
};

export default LocationList;
