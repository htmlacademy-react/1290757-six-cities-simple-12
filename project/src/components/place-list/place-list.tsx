import PlaceCard from '../place-card/place-card';
import React from 'react';
import {Place} from '../../types/types';
import {PlacesType} from '../../const/const';

type PlaceListProperty = {
  places: Place[];
  type: PlacesType;
}

const PlaceList = ({places, type}: PlaceListProperty): JSX.Element => (
  <div className={`${type === 'cities' ? 'cities__places-list tabs__content' : 'near-places__list'} places__list`}>
    {places.map((place: Place): JSX.Element => (
      <PlaceCard key={place.id} place={place} type={type} />
    ))}
  </div>
);

export default React.memo(PlaceList);
