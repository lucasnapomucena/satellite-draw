import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Select from 'ol/interaction/Select.js';
import { useEffect, useState } from 'react';
import {
  PiArrowCounterClockwise,
  PiPolygonLight,
  PiRectangle,
} from 'react-icons/pi';
import Modify from 'ol/interaction/Modify.js';

import { useMap } from '@/hooks/index';
import { pointerMove } from 'ol/events/condition';

const MapControlsContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 9;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MapControls = () => {
  const map = useMap();

  const [isDrawingPolygon, setIsDrawingPolygon] = useState<boolean>(false);
  const vectorSource = new VectorSource();

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const modify = new Modify({
    source: vectorSource,
  });

  const selectPointerMove = new Select({
    condition: pointerMove,
  });

  const polygonDraw = new Draw({
    source: vectorSource,
    type: 'Polygon',
  });

  const handleDrawClick = () => {
    if (!isDrawingPolygon) {
      map?.addInteraction(selectPointerMove);
      map?.addInteraction(polygonDraw);
      map?.addInteraction(modify);
      map?.addLayer(vectorLayer);
      setIsDrawingPolygon(true);

      return;
    }

    map?.getInteractions().forEach((interaction) => {
      if (interaction instanceof Draw) {
        map.removeInteraction(interaction);
        setIsDrawingPolygon(false);
      }
    });
  };

  const handleUndoClick = () => {
    map?.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer) {
        const source = layer.getSource();
        const features = source.getFeatures();

        if (features.length > 0) {
          source.removeFeature(features[features.length - 1]);
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      map?.removeInteraction(modify);
      map?.removeInteraction(polygonDraw);
      map?.removeInteraction(selectPointerMove);
      map?.removeLayer(vectorLayer);
    };
  }, []);

  return (
    <MapControlsContainer>
      <Button
        colorScheme={isDrawingPolygon ? 'teal' : 'gray'}
        onClick={() => handleDrawClick()}
        variant="solid"
      >
        <PiPolygonLight size={24} />
      </Button>

      <Button colorScheme="gray" variant="solid">
        <PiRectangle size={24} />
      </Button>

      <Button variant="solid" onClick={() => handleUndoClick()}>
        <PiArrowCounterClockwise size={24} />
      </Button>
    </MapControlsContainer>
  );
};

export default MapControls;
