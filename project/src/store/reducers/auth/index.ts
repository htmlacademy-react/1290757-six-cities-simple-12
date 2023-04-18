import {ReducerWithInitialState} from '@reduxjs/toolkit/dist/createReducer';
import {AuthState} from '../../../types/state';
import {ActionReducerMapBuilder, createReducer, PayloadAction} from '@reduxjs/toolkit';
import {requireAuthorization} from '../../action';

const initialState: AuthState = {
  isUserAuth: false
};

export const authReducer: ReducerWithInitialState<AuthState> = createReducer(initialState, (builder: ActionReducerMapBuilder<AuthState>): void => {
  builder
    .addCase(requireAuthorization, (state: AuthState, action: PayloadAction<boolean>): void => {
      state.isUserAuth = action.payload;
    });
});
