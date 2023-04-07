import {ActionCreatorWithPayload, createAction} from '@reduxjs/toolkit';
import {City, Coords, Offer} from '../types/types';
import {AppRoute, CityName, SortingType} from '../const/const';

export const updateCity: ActionCreatorWithPayload<CityName> = createAction<CityName>('city/update');
export const setSorting: ActionCreatorWithPayload<SortingType> = createAction<SortingType>('offers/setSorting');
export const loadOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('offers/load');
export const setOffersLoadingStatus: ActionCreatorWithPayload<boolean> = createAction<boolean>('offers/loadingStatus');
export const requireAuthorization: ActionCreatorWithPayload<boolean> = createAction<boolean>('user/auth');
export const redirectToRoute: ActionCreatorWithPayload<AppRoute> = createAction<AppRoute>('app/redirectToRoute');
export const updateMainPageOffers: ActionCreatorWithPayload<Offer[]> = createAction<Offer[]>('map/updateMainPageOffers');
export const setMapCity: ActionCreatorWithPayload<City> = createAction<City>('map/setCity');
export const setHoveredOffer: ActionCreatorWithPayload<Coords> = createAction<Coords>('offers/setSelectedOffer');
