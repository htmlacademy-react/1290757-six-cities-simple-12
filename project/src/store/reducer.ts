import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {loadOffers, requireAuthorization, setOffersLoadingStatus, updateCity, setSorting} from './action';
import {Offer} from '../types/types';
import {CITY_LIST} from '../mocks/city';
import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {SortingType} from '../const/const';

export type State = {
  city: string;
  offers: Offer[];
  sortingType: SortingType
  isOffersLoading: boolean;
  isUserAuth: boolean;
};

const initialState: State = {
  city: CITY_LIST[0],
  offers: [],
  sortingType: SortingType.Popular,
  isOffersLoading: false,
  isUserAuth: false
};

const reducer: ReducerWithInitialState<State> = createReducer(initialState, (builder: ActionReducerMapBuilder<State>): void => {
  builder
    .addCase(updateCity, (state: State, action: PayloadAction<string>): void => {
      state.city = action.payload;
    })
    .addCase(setSorting, (state: State, action: PayloadAction<SortingType>): void => {
      state.sortingType = action.payload;
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
