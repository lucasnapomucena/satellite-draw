import { Button, theme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { MultiPoint } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle, Fill, Stroke, Style } from 'ol/style';
import { useState } from 'react';
import { PiFloppyDisk, PiPolygonLight } from 'react-icons/pi';

import { useMap } from '@hooks/index';
import { Type } from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';

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
    style: [
      new Style({
        stroke: new Stroke({
          color: theme.colors?.green[900],
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(51, 136, 255, 0.2)',
        }),
      }),
      new Style({
        image: new Circle({
          radius: 5,
          fill: new Fill({
            color: theme.colors?.white,
          }),
          stroke: new Stroke({
            color: theme.colors?.green[500],
            width: 2,
          }),
        }),
        geometry: function (feature) {
          const geometry = feature?.getGeometry();
          const coordinates = (geometry as RenderFeature)?.getFlatCoordinates();

          return new MultiPoint(coordinates);
        },
      }),
    ],
  });

  const handleDrawClick = (type: Type) => {
    if (!isDraw) {
      const draw = new Draw({
        source: vectorSource,
        type: type,
      });

      map?.addInteraction(draw);
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

  return (
    <MapControlsContainer>
      <Button onClick={() => handleDrawClick('Polygon')}>
        <PiPolygonLight />
      </Button>

      <Button onClick={() => handleDrawClick('MultiPolygon')}>
        <PiFloppyDisk />
      </Button>
    </MapControlsContainer>
  );
};

export default MapControls;
