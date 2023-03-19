import {useEffect, useRef} from 'react';
import useMap from '../../hooks/useMap';
import {Icon, Marker} from 'leaflet';
import {MapCity, Point, Points} from '../../types/types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: MapCity;
  points: Points;
  selectedPoint: Point;
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

const Map = ({city, points, selectedPoint}: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((point: Point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <section className="cities__map map" style={{height: '500px'}} ref={mapRef}></section>;
};

export default Map;
