import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import useMap from '../../hooks/use-map';
import {Icon, Marker} from 'leaflet';
import {Offer, Point} from '../../types/types';
import {MapState, OfferState, State} from '../../types/state';
import 'leaflet/dist/leaflet.css';
import {useAppSelector} from '../../hooks/util';

type MapProps = {
  type: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const getMapPoints = (offers: Offer[]): Point[] =>
  offers.map((offer: Offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
    zoom: offer.location.zoom
  }));

const Map = ({type}: MapProps): JSX.Element => {
  const {activeOffer}: OfferState = useAppSelector((state: State) => state.offerReducer);
  const {mapOffers}: MapState = useAppSelector((state: State) => state.mapReducer);
  const [locations, setLocations]: [Point[], Dispatch<SetStateAction<Point[]>>] = useState(getMapPoints(mapOffers));
  const mapRef = useRef(null);
  const map = useMap(mapRef);

  useEffect(() => {
    setLocations(getMapPoints(mapOffers));
  }, [mapOffers]);

  useEffect(() => {
    if (map) {
      locations.forEach((point: Point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            point.lat === activeOffer?.latitude && point.lng === activeOffer.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, locations, activeOffer]);

  return <section className={`${type}__map map`} ref={mapRef}></section>;
};

export default Map;
