import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/types';

export const updateCity: ActionCreatorWithPayload<string> = createAction<string>('city/update');
export const updateOffers: ActionCreatorWithPayload<void> = createAction('offers/update');
export const sortOffers: ActionCreatorWithPayload<string> = createAction<string>('offers/sort');
export const loadOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/load');
export const setError = createAction<string | null>('app/setError');
export const setOffersLoadingStatus = createAction<boolean>('offers/loadingStatus');
