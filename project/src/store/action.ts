import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/types';
import {AppRoute} from '../const/const';

export const updateCity: ActionCreatorWithPayload<string> = createAction<string>('city/update');
export const getOffers: ActionCreatorWithPayload<void> = createAction('offers/get');
export const sortOffers: ActionCreatorWithPayload<string> = createAction<string>('offers/sort');
export const loadOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/load');
export const setOffersLoadingStatus = createAction<boolean>('offers/loadingStatus');
export const requireAuthorization = createAction<boolean>('user/auth');
export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
