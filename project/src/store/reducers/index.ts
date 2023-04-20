import {combineReducers} from '@reduxjs/toolkit';
import {cityReducer} from './city';
import {authReducer} from './auth';
import {reviewReducer} from './review';
import {mapReducer} from './map';
import {offerReducer} from './offer';

export const rootReducer = combineReducers({
  cityReducer,
  authReducer,
  reviewReducer,
  mapReducer,
  offerReducer
});

export default rootReducer;
