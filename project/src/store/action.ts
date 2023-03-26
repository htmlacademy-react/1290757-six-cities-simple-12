import {createAction} from '@reduxjs/toolkit';

export const updateCity = createAction<string>('city/update');
export const updateOffers = createAction('offers/update');
