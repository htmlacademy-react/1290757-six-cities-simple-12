import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import {State} from '../store/reducer';
import {useAppSelector} from './util';

const URL_TEMPLATE = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>
): Map | null {
  const {mapCity}: State = useAppSelector((state: State) => state);
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  const layer = new TileLayer(
    URL_TEMPLATE,
    {
      attribution: ATTRIBUTION
    }
  );

  useEffect(() => {
    if (mapRef.current !== null && mapCity && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: mapCity.location.latitude,
          lng: mapCity.location.longitude
        },
        zoom: mapCity.location.zoom
      });

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map && mapCity) {
      map.setView([mapCity.location.latitude, mapCity.location.longitude], mapCity.location.zoom);
    }
  }, [mapCity, map]);

  return map;
}

export default useMap;
