import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  loadComments,
  loadNearbyOffers,
  loadOffers, loadOffer,
  requireAuthorization, setActiveOffer, setMapCity,
  setOffersLoadingStatus,
  setSorting,
  updateCity, setMapOffers
} from './action';
import {City, Comment, Coords, Offer} from '../types/types';
import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {CityName, SortingType} from '../const/const';

const defaultCity: City = {
  name: '',
  location: {
    'latitude': 0,
    'longitude': 0,
    'zoom': 0
  }
};

export type State = {
  city: CityName;
  offers: Offer[];
  sortingType: SortingType;
  isOffersLoading: boolean;
  isUserAuth: boolean;
  mapOffers: Offer[];
  mapCity: City;
  activeOffer: Coords | null;
  detailedOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
};

const initialState: State = {
  city: CityName.Paris,
  offers: [],
  sortingType: SortingType.Popular,
  isOffersLoading: false,
  isUserAuth: false,
  mapOffers: [],
  mapCity: defaultCity,
  activeOffer: null,
  detailedOffer: null,
  nearbyOffers: [],
  comments: []
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
    .addCase(loadOffer, (state: State, action: PayloadAction<Offer>): void => {
      state.detailedOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state: State, action: PayloadAction<Offer[]>): void => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state: State, action: PayloadAction<Comment[]>): void => {
      state.comments = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state: State, action: PayloadAction<boolean>): void => {
      state.isOffersLoading = action.payload;
    })
    .addCase(requireAuthorization, (state: State, action: PayloadAction<boolean>): void => {
      state.isUserAuth = action.payload;
    })
    .addCase(setMapOffers, (state: State, action: PayloadAction<Offer[]>): void => {
      state.mapOffers = action.payload;
    })
    .addCase(setMapCity, (state: State, action: PayloadAction<City>): void => {
      state.mapCity = action.payload;
    })
    .addCase(setActiveOffer, (state: State, action: PayloadAction<Coords | null>): void => {
      state.activeOffer = action.payload;
    });
});

export default reducer;
