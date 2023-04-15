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

export const ADD_COMMENT_ERROR = 'Error, can\'t save review, please, try again';
