export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id'
}

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

type City = {
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
}

export type Points = Point[];

export type MapCity = {
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
