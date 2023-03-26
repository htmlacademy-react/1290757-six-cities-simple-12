import {createReducer, Draft, PayloadAction} from '@reduxjs/toolkit';
import {sortOffers, updateCity, updateOffers} from './action';
import {Offer} from '../types/types';
import {CITY_LIST} from '../mocks/city';
import {offersMock} from '../mocks/offers';

export type State = {
  city: string;
  offers: Offer[];
};

const initialState: State = {
  city: CITY_LIST[0],
  offers: []
};

const getCityOffers = (city: string): Offer[] => offersMock.filter((offer: Offer) => offer.city.name === city);

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCity, (state: Draft<State>, action: PayloadAction<string>) => {
      state.city = action.payload;
    })
    .addCase(updateOffers, (state: Draft<State>) => {
      state.offers = getCityOffers(state.city);
    })
    .addCase(sortOffers, (state: Draft<State>, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'Price: low to high':
          state.offers = state.offers.sort((a: Draft<Offer>, b: Draft<Offer>) => a.price - b.price);
          break;
        case 'Price: high to low':
          state.offers = state.offers.sort((a: Draft<Offer>, b: Draft<Offer>) => b.price - a.price);
          break;
        case 'Top rated first':
          state.offers = state.offers.sort((a: Draft<Offer>, b: Draft<Offer>) => b.rating - a.rating);
          break;
        default:
          state.offers = getCityOffers(state.city);
      }
    });
});

export default reducer;
