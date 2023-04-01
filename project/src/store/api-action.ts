import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state';
import {AxiosInstance} from 'axios';
import {loadOffers, setError, setOffersLoadingStatus} from './action';
import {Offer} from '../types/types';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const/const';
import {store} from './index';
import {State} from './reducer';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch , extra: api}): Promise<void> => {
    try {
      dispatch(setOffersLoadingStatus(true));
      const {data} = await api.get<Offer[]>(APIRoute.Offer);
      dispatch(setOffersLoadingStatus(false));
      dispatch(loadOffers(data));
    } catch {
      dispatch(setError('Offer loading failed'));
    }
  }
);

export const clearErrorAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/clearError',
  (): void => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);
