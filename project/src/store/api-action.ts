import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
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
import {AuthData, Review, Offer, Feedback, UserData} from '../types/types';
import {APIRoute, AppRoute, ErrorMessage} from '../const/const';
import {saveToken} from '../services/token';
import {generatePath} from 'react-router-dom';
import {toast} from 'react-toastify';

type ThunkOptions = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'data/fetchOffers',
  async (_arg, {dispatch , extra: api}): Promise<void> => {
    dispatch(setOffersLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<void, { id: string }, ThunkOptions>(
  'data/fetchOffer',
  async (_arg: {id: string}, {dispatch , extra: api}): Promise<void> => {
    const {data} = await api.get<Offer>(generatePath(APIRoute.Offer, {id: _arg.id}));
    dispatch(loadOffer(data));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<void, { id: string }, ThunkOptions>(
  'data/fetchNearbyOffers',
  async (_arg: {id: string}, {dispatch , extra: api}): Promise<void> => {
    const {data} = await api.get<Offer[]>(generatePath(APIRoute.Nearby, {id: _arg.id}));
    dispatch(loadNearbyOffers(data));
  }
);

export const fetchCommentsAction = createAsyncThunk<void, { id: string }, ThunkOptions>(
  'data/fetchComments',
  async (_arg: {id: string}, {dispatch , extra: api}): Promise<void> => {
    const {data} = await api.get<Review[]>(generatePath(APIRoute.Comments, {id: _arg.id}));
    dispatch(loadComments(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkOptions>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}): Promise<void> => {
    try {
      const {data: {email}} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(email));
    } catch {
      dispatch(requireAuthorization(''));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkOptions>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}): Promise<void> => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(data.email));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const addComment = createAsyncThunk<boolean, {review: Feedback; id: string}, ThunkOptions>(
  'data/postComment',
  async (_arg: {review: Feedback; id: string}, {dispatch , extra: api}): Promise<boolean> => {
    dispatch(setCommentLoadingStatus(true));
    try {
      const {data} = await api.post<Review[]>(generatePath(APIRoute.Comments, {id: _arg.id}), _arg.review);
      dispatch(loadComments(data));
      return true;
    } catch (err) {
      toast.error(ErrorMessage.AddComment);
      return false;
    } finally {
      dispatch(setCommentLoadingStatus(false));
    }
  },
);
