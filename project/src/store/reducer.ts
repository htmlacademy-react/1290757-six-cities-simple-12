import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  loadOffers,
  requireAuthorization,
  setOffersLoadingStatus,
  sortOffers,
  updateCity,
  updateOffers
} from './action';
import {Offer} from '../types/types';
import {CITY_LIST} from '../mocks/city';
import {getCityOffers} from '../util/util';
import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {SortingTypes} from '../const/const';

export type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
  isUserAuth: boolean;
};

const initialState: State = {
  city: CITY_LIST[0],
  offers: [],
  isOffersLoading: false,
  isUserAuth: false
};

const reducer: ReducerWithInitialState<State> = createReducer(initialState, (builder: ActionReducerMapBuilder<State>): void => {
  builder
    .addCase(updateCity, (state: State, action: PayloadAction<string>): void => {
      state.city = action.payload;
    })
    .addCase(updateOffers, (state: State): void => {
      state.offers = getCityOffers(state);
    })
    .addCase(sortOffers, (state: State, action: PayloadAction<string>): void => {
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
          state.offers = getCityOffers(state);
      }
    })
    .addCase(loadOffers, (state: State, action: PayloadAction<Offer[]>): void => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state: State, action: PayloadAction<boolean>): void => {
      state.isOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state: State, action: PayloadAction<boolean>): void => {
      state.isUserAuth = action.payload;
    });
});

export default reducer;
