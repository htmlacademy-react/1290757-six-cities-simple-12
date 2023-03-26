import {useAppDispatch} from '../../hooks/util';
import React, {SyntheticEvent} from 'react';
import {updateCity, updateOffers} from '../../store/action';

type LocationProperty = {
  city: string;
  isActive: boolean;
}

const Location = ({city, isActive}: LocationProperty): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
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
};

export default Location;
