import { createContext, useRef, useState, useLayoutEffect } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export const MapContext = createContext<Map | null>(null);

interface MapProviderProps {
  children: React.ReactNode;
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<Map | null>(null);

  useLayoutEffect(() => {
    const basemap = new TileLayer({
      source: new OSM(),
    });

    if (mapRef.current && !mapInstance) {
      const map = new Map({
        target: mapRef.current,
        layers: [basemap],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      setMapInstance(map);
    }

    return () => {
      mapInstance?.dispose();
    };
  }, [mapRef.current, mapInstance]);

  return (
    <MapContext.Provider value={mapInstance}>
      <div ref={mapRef} id="map">
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default MapProvider;
