import Header from '../../components/header/header';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import CommentsList from '../../components/comments-list/comments-list';
import Map from '../../components/map/map';
import React, {useEffect} from 'react';
import {getPlacesFromOffers} from '../../util/util';
import PlaceList from '../../components/place-list/place-list';
import {State} from '../../store/reducer';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {store} from '../../store';
import {fetchCommentsAction, fetchNearbyOffersAction, fetchOfferAction} from '../../store/api-action';
import {Coords, Offer} from '../../types/types';
import {setActiveOffer, setMapCity, setMapOffers} from '../../store/action';
import {useLocation} from 'react-router-dom';

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

const Room = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {detailedOffer, nearbyOffers, isUserAuth}: State = useAppSelector((state: State) => state);
  const starRating: string = detailedOffer ? ((detailedOffer.rating / 5) * 100).toFixed() : '';
  const location = useLocation();
  const id: string = location.pathname.split('/')[2];

  const getPageData = (): void => {
    store.dispatch(fetchOfferAction({id: id}));
    store.dispatch(fetchNearbyOffersAction({id: id}));
    store.dispatch(fetchCommentsAction({id: id}));
  };

  useEffect( (): void => {
    if(id) {
      getPageData();
    }
  }, [id]);

  useEffect(() => {
    const mapOffers: Offer[] = detailedOffer ? [...nearbyOffers, detailedOffer] : nearbyOffers;

    dispatch(setMapOffers(mapOffers));
    dispatch(setMapCity(mapOffers[0]?.city));

    if (detailedOffer) {
      const coords: Coords = {latitude: detailedOffer?.location.latitude, longitude: detailedOffer?.location.longitude};

      dispatch(setActiveOffer(coords));

      return () => {
        dispatch(setActiveOffer(null));
      };
    }
  }, [detailedOffer, nearbyOffers]);

  return (
    <div className="page">
      <Header isMain={false} />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {detailedOffer?.images.map((img: string, count: number): JSX.Element | string => count < 6 ? (
                <div key={Math.random() * Number.MAX_VALUE} className="property__image-wrapper">
                  <img className="property__image" src={img} alt={detailedOffer.type} />
                </div>
              ) : '')}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {detailedOffer?.isPremium ? getPremiumMotivator() : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {detailedOffer?.title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${starRating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{detailedOffer?.rating}</span>
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
                <b className="property__price-value">&euro;{detailedOffer?.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {detailedOffer?.goods.map((good: string): JSX.Element => (
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
                    <img className="property__avatar user__avatar" src={detailedOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {detailedOffer?.host.name}
                  </span>
                  {detailedOffer?.host.isPro ? getUserStatus() : ''}
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
                <CommentsList />
                {isUserAuth ? <ReviewsForm /> : ''}
              </section>
            </div>
          </div>
          <Map type='property' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlaceList places={getPlacesFromOffers(nearbyOffers)} type="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;
