import styled from '@emotion/styled';
import { useEffect } from 'react';
import useMapStore from '../../../store/map';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import { Map, View } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

const MapComponentContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

export const MapContainer = () => {
  const setMap = useMapStore((state) => state.setMap);
  const source = new VectorSource({ wrapX: false });
  const vector = new VectorLayer({
    source: source,
  });

  const layer = new TileLayer({ source: new OSM() });

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [layer, vector],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Salva a instância do mapa na store
    setMap(map);

    // Cleanup ao desmontar o componente
    return () => {
      map.setTarget('');
    };
  }, [setMap]);

  return (
    <MapComponentContainer id="map" className="map"></MapComponentContainer>
  );
};

export default MapContainer;
