import { useCallback, useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';

import { PiArrowCounterClockwise, PiPolygonLight, PiCursor, PiRectangle } from 'react-icons/pi';

import { MapControlsContainer } from './style';
import { useInteractions } from './useInteractions';
import { useVectorLayer } from './useVectorLayer';
import VectorLayer from 'ol/layer/Vector';
import { useMapStore } from '@/store/useMapStore';

export const MapControls = () => {
  const map = useMapStore((state) => state.mapInstance);
  const [activeControl, setActiveControl] = useState<string | null>('select');
  const { vectorSource, vectorLayer } = useVectorLayer();
  const { modify, selectPointerMove, polygon, rectangle } = useInteractions(vectorSource);

  const controls = [
    { name: 'select', icon: <PiCursor size={24} />, handler: () => handleSelectClick() },
    { name: 'polygon', icon: <PiPolygonLight size={24} />, handler: () => handlePolygonClick() },
    { name: 'rectangle', icon: <PiRectangle size={24} />, handler: () => handleRectangleClick() },
    { name: 'undo', icon: <PiArrowCounterClockwise size={24} />, handler: () => handleUndoClick() },
  ];

  const handleAddLayer = useCallback(() => {
    const isVectorLayer = map
      ?.getLayers()
      .getArray()
      .some((layer) => layer instanceof VectorLayer);

    if (!isVectorLayer) {
      map?.addLayer(vectorLayer);
    }
  }, [map, vectorLayer]);

  const deactivateAllInteractions = useCallback(() => {
    polygon.setActive(false);
    rectangle.setActive(false);
    selectPointerMove.setActive(false);
  }, [polygon, rectangle, selectPointerMove]);

  const handleSelectClick = useCallback(() => {
    selectPointerMove.setActive(true);
  }, [selectPointerMove]);

  const handlePolygonClick = useCallback(() => {
    polygon.setActive(true);

    handleAddLayer();
  }, [polygon, handleAddLayer]);

  const handleRectangleClick = useCallback(() => {
    rectangle.setActive(true);
    handleAddLayer();
  }, [rectangle, handleAddLayer]);

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
      deactivateAllInteractions();

      const [control] = controls.filter((control) => control.name == name);

      control.handler();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map, deactivateAllInteractions],
  );

  useEffect(() => {
    if (map) {
      map.addInteraction(selectPointerMove);
      map.addInteraction(modify);
      map.addInteraction(polygon);
      map.addInteraction(rectangle);
      selectPointerMove.setActive(true);
      polygon.setActive(false);
      rectangle.setActive(false);
    }

  }, [map, selectPointerMove, selectPointerMove, modify, vectorLayer]);

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
