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
import {ADD_COMMENT_ERROR, APIRoute, AppRoute} from '../const/const';
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
  async (_arg, {dispatch, extra: api}): Promise<void> => {
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
  async ({login: email, password}, {dispatch, extra: api}): Promise<void> => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(true));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const addComment = createAsyncThunk<boolean, {review: Review; id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async (_arg: {review: Review; id: string}, {dispatch , extra: api}): Promise<boolean> => {
    dispatch(setCommentLoadingStatus(true));
    try {
      const {data} = await api.post<Comment[]>(generatePath(APIRoute.Comments, {id: _arg.id}), _arg.review);
      dispatch(loadComments(data));
      return true;
    } catch (err) {
      toast.error(ADD_COMMENT_ERROR);
      return false;
    } finally {
      dispatch(setCommentLoadingStatus(false));
    }
  },
);
