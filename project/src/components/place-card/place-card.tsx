import {generatePath, Link} from 'react-router-dom';
import {AppRoute, PlacesType} from '../../const/const';
import {setActiveOffer} from '../../store/action';
import {useAppDispatch} from '../../hooks/util';
import {Coords, Place} from '../../types/types';

type PlaceCardProperty = {
  place: Place;
  type: PlacesType;
}

const PlaceCard = ({place, type}: PlaceCardProperty): JSX.Element => {
  const dispatch = useAppDispatch();
  const coords: Coords = {latitude: place.latitude, longitude: place.longitude};
  const isTypeCities: boolean = type === PlacesType.Cities;

  const GetMotivator = (): JSX.Element => (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );

  const handleCardMouseOver = (): void => {
    if (isTypeCities) {
      dispatch(setActiveOffer(coords));
    }
  };

  const handleCardMouseLeave = (): void => {
    if (isTypeCities) {
      dispatch(setActiveOffer(null));
    }
  };

  return (
    <article className={`${type}__card place-card`} onMouseOver={handleCardMouseOver} onMouseLeave={handleCardMouseLeave}>
      {place.isPremium ? GetMotivator() : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <span>
          <img className="place-card__image" src={place.previewImage} width="260" height="200" alt="Place"/>
        </span>
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
          {isTypeCities ? <Link to={generatePath(AppRoute.Offer, {id: place.id.toString()})}>{place.title}</Link> : <span>{place.title}</span>}
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>
  );
};

export default PlaceCard;
