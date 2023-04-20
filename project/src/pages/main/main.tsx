import Header from '../../components/header/header';
import PlaceList from '../../components/place-list/place-list';
import React, {useEffect} from 'react';
import Map from '../../components/map/map';
import {getPlacesFromOffers} from '../../util/util';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import Sorting from '../../components/sorting/sorting';
import {Offer} from '../../types/types';
import {CityState, MapState, OfferState, State} from '../../types/state';
import {CityName, PlacesType, SortingType} from '../../const/const';
import {setMapCity, setMapOffers} from '../../store/action';

const getSortedOffer = (offers: Offer[], sortingType: SortingType): Offer[] => {
  switch (sortingType) {
    case SortingType.LowToHigh:
      return offers.sort((value: Offer, comparedValue: Offer) => value.price - comparedValue.price);
    case SortingType.HighToLow:
      return offers.sort((value: Offer, comparedValue: Offer) => comparedValue.price - value.price);
    case SortingType.TopRates:
      return offers.sort((value: Offer, comparedValue: Offer) => comparedValue.rating - value.rating);
    default:
      return offers;
  }
};

const getOffersByCity = (offers: Offer[], city: CityName): Offer[] =>
  offers.filter((offer: Offer): boolean => offer.city.name === city);

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {city}: CityState = useAppSelector((state: State) => state.cityReducer);
  const {mapOffers}: MapState = useAppSelector((state: State) => state.mapReducer);
  const {offers, sortingType}: OfferState = useAppSelector((state: State) => state.offerReducer);

  useEffect(() => {
    const cityOffers: Offer[] = getOffersByCity([...offers], city);
    const sortedOffers: Offer[] = getSortedOffer(cityOffers, sortingType);

    dispatch(setMapOffers(sortedOffers));
    dispatch(setMapCity(sortedOffers[0]?.city));
  }, [city, sortingType]);

  const getNoOffersContent = (): JSX.Element => (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );

  const getOffersContent = (): JSX.Element => (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{mapOffers.length} places to stay in {city}</b>
        <Sorting />
        <PlaceList places={getPlacesFromOffers(mapOffers)} type={PlacesType.Cities} />
      </section>
      <div className="cities__right-section">
        <Map type='cities' />
      </div>
    </div>
  );

  return (
    <div className="page page--gray page--main">
      <Header isMain/>

      <main className={`page__main page__main--index ${!offers.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          {offers.length ? getOffersContent() : getNoOffersContent()}
        </div>
      </main>
    </div>
  );
};

export default Main;
