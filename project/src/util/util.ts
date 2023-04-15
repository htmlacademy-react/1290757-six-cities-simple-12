import {Offer, Place} from '../types/types';

export const getPlacesFromOffers = (offers: Offer[]): Place[] => offers.map((offer: Offer) => ({
  id: offer.id,
  isPremium: offer.isPremium,
  previewImage: offer.previewImage,
  price: offer.price,
  rating: ((Math.round(offer.rating) / 5) * 100).toFixed(),
  title: offer.title,
  type: offer.type,
  latitude: offer.location.latitude,
  longitude: offer.location.longitude
}));
