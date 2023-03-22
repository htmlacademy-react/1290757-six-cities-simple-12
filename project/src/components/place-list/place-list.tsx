import PlaceCard, {Place} from '../place-card/place-card';
import React, {Dispatch, SetStateAction, useState} from 'react';

type PlaceListProperty = {
  places: Place[];
  type: string;
}

const PlaceList = ({places, type}: PlaceListProperty): JSX.Element => {
  const [, setCurrentPlace]: [number, Dispatch<SetStateAction<number>>] = useState(1);

  const clickHandler = (id: number): void => {
    setCurrentPlace(id);
  };

  return (
    <div className={`${type === 'cities' ? 'cities__places-list tabs__content' : 'near-places__list'} places__list`}>
      {places.map((place: Place): JSX.Element => (
        <PlaceCard key={place.id} place={place} clickHandler={clickHandler} type={type} />
      ))}
    </div>
  );
};

export default PlaceList;
