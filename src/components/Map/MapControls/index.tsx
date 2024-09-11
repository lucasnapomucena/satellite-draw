import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import Select from 'ol/interaction/Select.js';
import { useState } from 'react';
import { PiArrowCounterClockwise, PiPolygonLight } from 'react-icons/pi';
import Modify from 'ol/interaction/Modify.js';

import { useMap } from '@/hooks/index';
import { Type } from 'ol/geom/Geometry';
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

  const [isDraw, setIsDraw] = useState<boolean>(false);
  const vectorSource = new VectorSource();

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const selectPointerMove = new Select({
    condition: pointerMove,
  });

  const handleDrawClick = (type: Type) => {
    if (!isDraw) {
      const draw = new Draw({
        source: vectorSource,
        type: type,
      });

      const modify = new Modify({
        source: vectorSource,
      });
      map?.addInteraction(selectPointerMove);
      map?.addInteraction(draw);
      map?.addInteraction(modify);
      map?.addLayer(vectorLayer);
      setIsDraw(true);

      return;
    }

    map?.getInteractions().forEach((interaction) => {
      if (interaction instanceof Draw) {
        map.removeInteraction(interaction);
        setIsDraw(false);
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

  return (
    <MapControlsContainer>
      <Button onClick={() => handleDrawClick('Polygon')}>
        <PiPolygonLight size={24} />
      </Button>

      <Button onClick={() => handleUndoClick()}>
        <PiArrowCounterClockwise size={24} />
      </Button>
    </MapControlsContainer>
  );
};

export default MapControls;
