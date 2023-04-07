import Header from '../../components/header/header';
import PlaceList from '../../components/place-list/place-list';
import React, {useEffect} from 'react';
import Map from '../../components/map/map';
import {getPlacesFromOffers} from '../../util/util';
import LocationList from '../../components/location-list/location-list';
import {useAppDispatch, useAppSelector} from '../../hooks/util';
import {State} from '../../store/reducer';
import Sorting from '../../components/sorting/sorting';
import {Offer} from "../../types/types";
import {CityName, SortingType} from "../../const/const";
import {setMapCity, updateMainPageOffers} from "../../store/action";

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
}

const getOffersByCity = (offers: Offer[], city: CityName): Offer[] =>
  offers.filter((offer: Offer): boolean => offer.city.name === city);

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {city, offers, sortingType, mainPageOffers}: State = useAppSelector((state: State) => state);

  useEffect(() => {
    const cityOffers: Offer[] = getOffersByCity([...offers], city);
    const sortedOffers: Offer[] = getSortedOffer(cityOffers, sortingType);

    dispatch(updateMainPageOffers(sortedOffers));
    dispatch(setMapCity(sortedOffers[0]?.city));
  }, [city, sortingType]);

  return (
    <div className="page page--gray page--main">
      <Header isMain/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{mainPageOffers.length} places to stay in {city}</b>
              <Sorting />
              <PlaceList places={getPlacesFromOffers(mainPageOffers)} type='cities' />
            </section>
            <div className="cities__right-section">
              <Map type='cities' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
