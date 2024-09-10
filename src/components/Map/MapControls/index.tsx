import { Button } from '@chakra-ui/react';
import { PiPolygonLight, PiFloppyDisk } from 'react-icons/pi';
import styled from '@emotion/styled';
import useMapStore from '../../../store/map';
import Draw from 'ol/interaction/Draw.js';
import VectorSource from 'ol/source/Vector';

const MapControlsContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const source = new VectorSource();
let draw;

export const MapControls = () => {
  const map = useMapStore((state) => state.map);

  const drawOptions = {
    polygon: () => {
      draw = new Draw({
        source: source,
        type: 'Polygon',
      });

      map?.addInteraction(draw);
    },
  };

  return (
    <MapControlsContainer>
      <Button onClick={() => drawOptions.polygon()}>
        <PiPolygonLight />
      </Button>

      <Button onClick={() => {}}>
        <PiFloppyDisk />
      </Button>
    </MapControlsContainer>
  );
};

export default MapControls;
