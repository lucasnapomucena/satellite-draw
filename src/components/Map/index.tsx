import { useMapStore } from '@/store/useMapStore';
import Map from 'ol/Map';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { useEffect } from 'react';
import { MapContainer } from './style';

interface MapProviderProps {
  children: React.ReactNode;
}

export const MapComponent = ({ children }: MapProviderProps) => {
  const { mapInstance, setMapInstance } = useMapStore((state) => state);

  useEffect(() => {
    if (!mapInstance) {
      const basemap = new TileLayer({
        source: new OSM(),
      });

      const map = new Map({
        target: 'map',
        layers: [basemap],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      setMapInstance(map);
    }
  }, [mapInstance, setMapInstance]);

  return <MapContainer id="map">{children}</MapContainer>;
};

export default MapComponent;
