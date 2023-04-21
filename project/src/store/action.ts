import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {City, Review, Coords, Offer} from '../types/types';
import {AppRoute, CityName, SortingType} from '../const/const';

export const updateCity: ActionCreatorWithPayload<CityName> = createAction<CityName>('city/update');
export const setSorting: ActionCreatorWithPayload<SortingType> = createAction<SortingType>('offers/setSorting');
export const loadOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/load');
export const loadOffer: ActionCreatorWithPayload<Offer> = createAction<Offer>('offers/loadOffer');
export const loadNearbyOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/loadNearbyOffer');
export const setActiveOffer: ActionCreatorWithPayload<Coords | null> = createAction<Coords | null>('offers/setActiveOffer');
export const setOffersLoadingStatus: ActionCreatorWithPayload<boolean> = createAction<boolean>('offers/loadingStatus');
export const requireAuthorization: ActionCreatorWithPayload<string> = createAction<string>('user/auth');
export const redirectToRoute: ActionCreatorWithPayload<AppRoute> = createAction<AppRoute>('app/redirectToRoute');
export const setMapOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('map/setOffers');
export const setMapCity: ActionCreatorWithPayload<City> = createAction<City>('map/setCity');
export const setCommentLoadingStatus: ActionCreatorWithPayload<boolean> = createAction<boolean>('reviews/loadingStatus');
export const loadComments: ActionCreatorWithPayload<Review[]> = createAction<Review[]>('reviews/load');
