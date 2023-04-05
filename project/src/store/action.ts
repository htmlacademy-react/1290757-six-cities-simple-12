import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/types';
import {AppRoute, SortingType} from '../const/const';

export const updateCity: ActionCreatorWithPayload<string> = createAction<string>('city/update');
export const setSorting: ActionCreatorWithPayload<SortingType> = createAction<SortingType>('offers/setSorting');
export const loadOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/load');
export const setOffersLoadingStatus: ActionCreatorWithPayload<boolean> = createAction<boolean>('offers/loadingStatus');
export const requireAuthorization: ActionCreatorWithPayload<boolean> = createAction<boolean>('user/auth');
export const redirectToRoute: ActionCreatorWithPayload<AppRoute> = createAction<AppRoute>('app/redirectToRoute');
