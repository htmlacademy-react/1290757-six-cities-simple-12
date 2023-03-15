import PlaceCard, {Place} from '../place-card/place-card';
import React, {Dispatch, SetStateAction, useState} from 'react';

type PlaceListProperty = {
  places: Place[];
}

const PlaceList = ({places}: PlaceListProperty): JSX.Element => {
  const [currentPlace, setCurrentPlace]: [number, Dispatch<SetStateAction<number>>] = useState(1);

  const clickHandler = (id: number): void => {
    setCurrentPlace(id);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place: Place): JSX.Element => (
        <PlaceCard key={place.id} place={place} clickHandler={clickHandler} />
      ))}
    </div>
  );
};

export default PlaceList;
