import {createReducer, Draft, PayloadAction} from '@reduxjs/toolkit';
import {updateCity, updateOffers} from './action';
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

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCity, (state: Draft<State>, action: PayloadAction<string>) => {
      state.city = action.payload;
    })
    .addCase(updateOffers, (state: Draft<State>) => {
      state.offers = offersMock.filter((offer: Offer) => offer.city.name === state.city);
    });
});

export default reducer;
