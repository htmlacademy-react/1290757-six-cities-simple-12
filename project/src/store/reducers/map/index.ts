import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {City, Offer} from '../../../types/types';
import {MapState} from '../../../types/state';
import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {setMapCity, setMapOffers} from '../../action';
import {DEFAULT_CITY} from '../../../const/const';

const initialState: MapState = {
  mapOffers: [],
  mapCity: DEFAULT_CITY,
};

export const mapReducer: ReducerWithInitialState<MapState> = createReducer(initialState, (builder: ActionReducerMapBuilder<MapState>): void => {
  builder
    .addCase(setMapOffers, (state: MapState, action: PayloadAction<Offer[]>): void => {
      state.mapOffers = action.payload;
    })
    .addCase(setMapCity, (state: MapState, action: PayloadAction<City>): void => {
      state.mapCity = action.payload;
    });
});
