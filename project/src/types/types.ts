import {CityName, SortingType} from '../const/const';

export type Offer = {
  city: City;
  previewImage: string;
  images: string[];
  title: string;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
  id: number;
}

export type City = {
  name: string;
  location: Location;
}

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
}

export type Point = {
  title: string;
  lat: number;
  lng: number;
  zoom: number;
}

export type Comment = {
  id: number;
  user: User;
  rating: number;
  comment: string;
  date: string;
}

type User = {
  id: number;
  isPro: boolean;
  name: string;
  avatarUrl: string;
}

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  id: number;
  email: string;
  token: string;
};

export type Coords = {
  latitude: number;
  longitude: number;
}

export type Review = {
  comment: string;
  rating: number;
}

export type Place = {
  id: number;
  isPremium: boolean;
  previewImage: string;
  price: number;
  rating: string;
  title: string;
  type: string;
  latitude: number;
  longitude: number;
}

export type State = {
  city: CityName;
  offers: Offer[];
  sortingType: SortingType;
  isOffersLoading: boolean;
  isUserAuth: boolean;
  mapOffers: Offer[];
  mapCity: City;
  activeOffer: Coords | null;
  detailedOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Comment[];
  isReviewSending: boolean;
};
