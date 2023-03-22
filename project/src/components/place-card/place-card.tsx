import {generatePath, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../types/types';
import {SyntheticEvent} from 'react';

export type Place = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: string;
  title: string;
  type: string;
}

type PlaceCardProperty = {
  place: Place;
  clickHandler: (id: number) => void;
  type: string;
}

const GetMotivator = (): JSX.Element => (
  <div className="place-card__mark">
    <span>Premium</span>
  </div>
);

const PlaceCard = ({place, clickHandler, type}: PlaceCardProperty): JSX.Element => {
  const navigate = useNavigate();

  return (
    <article className={`${type}__card place-card`} onClick={() => clickHandler(place.id)}>
      {place.isPremium ? GetMotivator() : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={place.previewImage} width="260" height="200" alt="Place"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${place.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#" onClick={(event: SyntheticEvent) => {
            event.preventDefault();
            navigate(generatePath(AppRoute.Offer, {id: place.id.toString()}));
          }}
          >{place.title}
          </a>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
