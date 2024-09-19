import { useCallback, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

import { PiArrowCounterClockwise, PiPolygonLight, PiRectangle } from 'react-icons/pi';
import { useMap } from '@/hooks/index';
import { MapControlsContainer } from './style';
import { useInteractions } from './useInteractions';
import { useVectorLayer } from './useVectorLayer';
import VectorLayer from 'ol/layer/Vector';

export const MapControls = () => {
  const map = useMap();
  const [activeControl, setActiveControl] = useState<string | null>(null);
  const { vectorSource, vectorLayer } = useVectorLayer();
  const { modify, selectPointerMove, polygon, rectangle } = useInteractions(vectorSource);

  const controls = [
    { name: 'polygon', icon: <PiPolygonLight size={24} />, handler: () => handlePolygonClick() },
    { name: 'rectangle', icon: <PiRectangle size={24} />, handler: () => handleRectangleClick() },
    { name: 'undo', icon: <PiArrowCounterClockwise size={24} />, handler: () => handleUndoClick() },
  ];

  const handleAddLayer = () => {
    const isVectorLayer = map
      ?.getLayers()
      .getArray()
      .some((layer) => layer instanceof VectorLayer);

    if (!isVectorLayer) {
      map?.addLayer(vectorLayer);
    }
  };

  const handlePolygonClick = useCallback(() => {
    polygon.setActive(true);
    rectangle.setActive(false);
    handleAddLayer();
  }, [polygon]);

  const handleRectangleClick = useCallback(() => {
    rectangle.setActive(true);
    polygon.setActive(false);
    handleAddLayer();
  }, [rectangle]);

  const handleUndoClick = useCallback(() => {
    const features = vectorSource.getFeatures();
    if (features.length > 0) {
      vectorSource.removeFeature(features[features.length - 1]);
    }
  }, [vectorSource]);

  const handle = useCallback(
    (name: string) => {
      if (!map) return;
      setActiveControl(name);

      const [control] = controls.filter((control) => control.name == name);

      control.handler();
    },
    [map],
  );

  useEffect(() => {
    if (map) {
      map.addInteraction(selectPointerMove);
      map.addInteraction(modify);

      setTimeout(() => {
        map.addInteraction(polygon);
        map.addInteraction(rectangle);
        polygon.setActive(false);
        rectangle.setActive(false);
      }, 1000);
    }
  }, [map, selectPointerMove, modify, vectorLayer]);

  return (
    <MapControlsContainer>
      {controls.map(({ name, icon }) => (
        <Button
          key={name}
          colorScheme={activeControl === name ? 'teal' : 'gray'}
          onClick={() => handle(name)}
          variant="solid"
        >
          {icon}
        </Button>
      ))}
    </MapControlsContainer>
  );
};

export default MapControls;
