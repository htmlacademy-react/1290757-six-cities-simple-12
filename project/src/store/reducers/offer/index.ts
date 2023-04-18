import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {Coords, Offer} from '../../../types/types';
import {OfferState} from '../../../types/state';
import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  setActiveOffer,
  setOffersLoadingStatus,
  setSorting
} from '../../action';
import {SortingType} from '../../../const/const';

const initialState: OfferState = {
  offers: [],
  sortingType: SortingType.Popular,
  isOffersLoading: false,
  activeOffer: null,
  detailedOffer: null,
  nearbyOffers: []
};

export const offerReducer: ReducerWithInitialState<OfferState> = createReducer(initialState, (builder: ActionReducerMapBuilder<OfferState>): void => {
  builder
    .addCase(setSorting, (state: OfferState, action: PayloadAction<SortingType>): void => {
      state.sortingType = action.payload;
    })
    .addCase(loadOffers, (state: OfferState, action: PayloadAction<Offer[]>): void => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state: OfferState, action: PayloadAction<Offer>): void => {
      state.detailedOffer = action.payload;
    })
    .addCase(loadNearbyOffers, (state: OfferState, action: PayloadAction<Offer[]>): void => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state: OfferState, action: PayloadAction<boolean>): void => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setActiveOffer, (state: OfferState, action: PayloadAction<Coords | null>): void => {
      state.activeOffer = action.payload;
    });
});
