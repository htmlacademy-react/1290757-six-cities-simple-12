import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../types/state';
import {AxiosInstance} from 'axios';
import {
  loadComments,
  loadNearbyOffers,
  loadOffers,
  loadOffer,
  redirectToRoute,
  requireAuthorization,
  setOffersLoadingStatus,
  setCommentLoadingStatus
} from './action';
import {AuthData, Comment, Offer, Review, State, UserData} from '../types/types';
import {APIRoute, AppRoute} from '../const/const';
import {saveToken} from '../services/token';
import {generatePath} from 'react-router-dom';
import {toast} from 'react-toastify';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch , extra: api}): Promise<void> => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<void, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (_arg: {id: string}, {dispatch , extra: api}): Promise<void> => {
    const {data} = await api.get<Offer>(generatePath(APIRoute.Offer, {id: _arg.id}));
    dispatch(loadOffer(data));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (_arg: {id: string}, {dispatch , extra: api}): Promise<void> => {
    const {data} = await api.get<Offer[]>(generatePath(APIRoute.Nearby, {id: _arg.id}));
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (_arg: {id: string}, {dispatch , extra: api}): Promise<void> => {
    const {data} = await api.get<Comment[]>(generatePath(APIRoute.Comments, {id: _arg.id}));
    dispatch(loadComments(data));
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
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const addComment = createAsyncThunk<void, {review: Review; id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async (_arg: {review: Review; id: string}, {dispatch , extra: api}): Promise<any> => {
    dispatch(setCommentLoadingStatus(true));
    try {
      return await api.post<Review>(generatePath(APIRoute.Comments, {id: _arg.id}), _arg.review);
    } catch (err) {
      toast.error('Error, can\'t save review, please, try again');
    } finally {
      dispatch(setCommentLoadingStatus(false));
    }
  },
);
