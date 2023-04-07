import {generatePath, NavigateFunction, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const/const';
import {setHoveredOffer} from "../../store/action";
import {useAppDispatch} from "../../hooks/util";
import {Coords} from "../../types/types";

export type Place = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: string;
  title: string;
  type: string;
  latitude: number;
  longitude: number;
}

type PlaceCardProperty = {
  place: Place;
  type: string;
}

const GetMotivator = (): JSX.Element => (
  <div className="place-card__mark">
    <span>Premium</span>
  </div>
);

const PlaceCard = ({place, type}: PlaceCardProperty): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const coords: Coords = {latitude: place.latitude, longitude: place.longitude};

  const onClickHandler = () => {
    navigate(generatePath(AppRoute.Offer, {id: place.id.toString()}));
  }

  const onMouseOverHandler = (): void => {
    dispatch(setHoveredOffer(coords))
  }

  const onMouseLeaveHandler = (): void => {
    dispatch(setHoveredOffer(null))
  }

  return (
    <article className={`${type}__card place-card`} onMouseOver={onMouseOverHandler} onMouseLeave={onMouseLeaveHandler}>
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
          <a href="#" onClick={onClickHandler}>{place.title}</a>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
