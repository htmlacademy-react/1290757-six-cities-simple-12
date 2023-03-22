import {Offer} from '../types/types';
import {Place} from '../components/place-card/place-card';

const getPlacesFromOffers = (offers: Offer[]): Place[] => offers.map((offer: Offer) => ({
  id: offer.id,
  isPremium: offer.isPremium,
  previewImage: offer.previewImage,
  price: offer.price,
  rating: ((offer.rating / 5) * 100).toFixed(),
  title: offer.title,
  type: offer.type
}));

export default getPlacesFromOffers;
