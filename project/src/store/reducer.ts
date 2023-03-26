import {createReducer, Draft, PayloadAction} from '@reduxjs/toolkit';
import {sortOffers, updateCity, updateOffers} from './action';
import {Offer, SortingTypes} from '../types/types';
import {CITY_LIST} from '../mocks/city';
import {getCityOffers} from '../util/util';

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
      state.offers = getCityOffers(state.city);
    })
    .addCase(sortOffers, (state: Draft<State>, action: PayloadAction<string>) => {
      switch (action.payload) {
        case SortingTypes.LowToHigh:
          state.offers = state.offers.sort((value: Offer, comparedValue: Offer) => value.price - comparedValue.price);
          break;
        case SortingTypes.HighToLow:
          state.offers = state.offers.sort((value: Offer, comparedValue: Offer) => comparedValue.price - value.price);
          break;
        case SortingTypes.TopRates:
          state.offers = state.offers.sort((value: Offer, comparedValue: Offer) => comparedValue.rating - value.rating);
          break;
        default:
          state.offers = getCityOffers(state.city);
      }
    });
});

export default reducer;
