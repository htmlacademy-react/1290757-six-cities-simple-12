import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  loadOffers,
  requireAuthorization, setHoveredOffer, setMapCity,
  setOffersLoadingStatus,
  setSorting,
  updateCity, updateMainPageOffers
} from './action';
import {City, Coords, Offer} from '../types/types';
import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {CityName, SortingType} from '../const/const';

const defaultCity: City = {
  name: CityName.Paris,
  location: {
    "latitude": 48.85661,
    "longitude": 2.351499,
    "zoom": 13
  }
}

export type State = {
  city: CityName;
  offers: Offer[];
  sortingType: SortingType
  isOffersLoading: boolean;
  isUserAuth: boolean;
  mainPageOffers: Offer[];
  mapCity: City;
  hoveredOffer: Coords | null;
};

const initialState: State = {
  city: CityName.Paris,
  offers: [],
  sortingType: SortingType.Popular,
  isOffersLoading: false,
  isUserAuth: false,
  mainPageOffers: [],
  mapCity: defaultCity,
  hoveredOffer: null
};

const reducer: ReducerWithInitialState<State> = createReducer(initialState, (builder: ActionReducerMapBuilder<State>): void => {
  builder
    .addCase(updateCity, (state: State, action: PayloadAction<CityName>): void => {
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
    })
    .addCase(updateMainPageOffers, (state: State, action: PayloadAction<Offer[]>): void => {
      state.mainPageOffers = action.payload;
    })
    .addCase(setMapCity, (state: State, action: PayloadAction<City>): void => {
      state.mapCity = action.payload;
    })
    .addCase(setHoveredOffer, (state: State, action: PayloadAction<Coords | null>): void => {
      state.hoveredOffer = action.payload;
    });
});

export default reducer;
