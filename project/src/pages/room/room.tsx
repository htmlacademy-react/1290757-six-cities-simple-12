import Header from '../../components/header/header';
import {Comment, Offer} from '../../types/types';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {getPlacesFromOffers} from '../../util/util';
import PlaceList from '../../components/place-list/place-list';
import {State} from '../../store/reducer';
import {useAppSelector} from '../../hooks/util';

type RoomProps = {
  reviews: Comment[];
}

const getUserStatus = (): JSX.Element => (
  <span className="property__user-status">
    Pro
  </span>
);

const getPremiumMotivator = (): JSX.Element => (
  <div className="property__mark">
    <span>Premium</span>
  </div>
);

const Room = ({reviews}: RoomProps): JSX.Element => {
  const {offers}: State = useAppSelector((state: State) => state);
  const id: string = location.pathname.split('/')[2];
  const currentOfferId: number = id ? Number(id) : 0;
  const [room, setRoom]: [Offer, Dispatch<SetStateAction<Offer>>] = useState(offers[currentOfferId]);
  const starRating: string = ((room.rating / 5) * 100).toFixed();
  const otherPlaceOffers: Offer[] = [...offers.slice(0, currentOfferId), ...offers.slice(currentOfferId + 1)];

  useEffect(() => {
    setRoom(offers.find((offer: Offer): boolean => offer.id === currentOfferId) ?? offers[0]);
  }, []);

  return (
    <div className="page">
      <Header isMain={false} />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {room.images.map((img: string, count: number): JSX.Element | string => count < 6 ? (
                <div key={Math.random() * Number.MAX_VALUE} className="property__image-wrapper">
                  <img className="property__image" src={img} alt={room.type} />
                </div>
              ) : '')}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {room.isPremium ? getPremiumMotivator() : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {room.title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${starRating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{room.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Apartment
                </li>
                <li className="property__feature property__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{room.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {room.goods.map((good: string): JSX.Element => (
                    <li key={Math.random() * Number.MAX_VALUE} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={room.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {room.host.name}
                  </span>
                  {room.host.isPro ? getUserStatus() : ''}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                    building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where
                    the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews}/>
                <ReviewsForm />
              </section>
            </div>
          </div>
          <Map type='property' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlaceList places={getPlacesFromOffers(otherPlaceOffers)} type="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;
