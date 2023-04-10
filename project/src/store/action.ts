import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {City, Comment, Coords, Offer} from '../types/types';
import {AppRoute, CityName, SortingType} from '../const/const';

export const updateCity: ActionCreatorWithPayload<CityName> = createAction<CityName>('city/update');
export const setSorting: ActionCreatorWithPayload<SortingType> = createAction<SortingType>('offers/setSorting');
export const loadOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/load');
export const loadOffer: ActionCreatorWithPayload<Offer> = createAction<Offer>('offers/loadOffer');
export const loadNearbyOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/loadNearbyOffer');
export const loadComments: ActionCreatorWithPayload<Comment[]> = createAction<Comment[]>('offers/loadComments');
export const setOffersLoadingStatus: ActionCreatorWithPayload<boolean> = createAction<boolean>('offers/loadingStatus');
export const requireAuthorization: ActionCreatorWithPayload<boolean> = createAction<boolean>('user/auth');
export const redirectToRoute: ActionCreatorWithPayload<AppRoute> = createAction<AppRoute>('app/redirectToRoute');
export const setMapOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('map/setMapOffers');
export const setMapCity: ActionCreatorWithPayload<City> = createAction<City>('map/setCity');
export const setActiveOffer: ActionCreatorWithPayload<Coords | null> = createAction<Coords | null>('offers/setActiveOffer');
