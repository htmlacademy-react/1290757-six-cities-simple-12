import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state';
import {AxiosInstance} from 'axios';
import {loadOffers, requireAuthorization, setError, setOffersLoadingStatus} from './action';
import {AuthData, Offer, UserData} from '../types/types';
import {APIRoute, TIMEOUT_SHOW_ERROR} from '../const/const';
import {store} from './index';
import {State} from './reducer';
import {saveToken} from '../services/token';

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(true));
    } catch {
      dispatch(requireAuthorization(false));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(true));
  },
);
