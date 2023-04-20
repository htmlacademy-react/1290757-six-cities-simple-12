import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {CityState} from '../../../types/state';
import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {updateCity} from '../../action';
import {CityName} from '../../../const/const';

const initialState: CityState = {
  city: CityName.Paris
};

export const cityReducer: ReducerWithInitialState<CityState> = createReducer(initialState, (builder: ActionReducerMapBuilder<CityState>): void => {
  builder
    .addCase(updateCity, (state: CityState, action: PayloadAction<CityName>): void => {
      state.city = action.payload;
    });
});
