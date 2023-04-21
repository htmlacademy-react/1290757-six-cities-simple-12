import {store} from '../store';
import {CityName, SortingType} from '../const/const';
import {City, Offer, Review, Coords} from './types';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CityState = {
  city: CityName;
}

export type AuthState = {
  email: string;
}

export type ReviewState = {
  reviews: Review[];
  isReviewSending: boolean;
}

export type MapState = {
  mapOffers: Offer[];
  mapCity: City;
}

export type OfferState = {
  offers: Offer[];
  sortingType: SortingType;
  isOffersLoading: boolean;
  activeOffer: Coords | null;
  detailedOffer: Offer | null;
  nearbyOffers: Offer[];
};
