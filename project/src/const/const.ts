import {City} from '../types/types';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Error = '/error',
}

export enum SortingType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRates = 'Top rated first'
}

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/:id',
  Nearby = '/hotels/:id/nearby',
  Login = '/login',
  Comments = '/comments/:id',
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum PlacesType {
  Near = 'near-places',
  Cities = 'cities'
}

export enum ErrorMessage {
  AddComment = 'Error, can\'t save review-item, please, try again',
  InvalidPassword = 'Пароль должен содержать минимум одну букву и цифру'
}

export const LOCATION_LIST: CityName[] = [CityName.Paris, CityName.Cologne, CityName.Brussels, CityName.Amsterdam, CityName.Hamburg, CityName.Dusseldorf];

export const DEFAULT_CITY: City = {
  name: '',
  location: {
    'latitude': 0,
    'longitude': 0,
    'zoom': 0
  }
};

export const PASSWORD_REGEX = /(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]{2,}/;
