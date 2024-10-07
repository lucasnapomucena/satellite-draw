import { useMapStore } from '@/store/useMapStore';
import { Button } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { PiArrowCounterClockwise, PiCursor, PiImage, PiPolygonLight, PiRectangle } from 'react-icons/pi';

import { useInteractions } from '@/modules/home/hooks/useInteractions';
import { useVectorLayer } from '@/modules/home/hooks/useVectorLayer';
import { IControl } from '@/modules/home/interfaces';
import { MapControlsContainer } from './style';

interface MapControlsProps {
  handleOpenModal: () => void;
}

export const MapControls = ({ handleOpenModal }: MapControlsProps) => {
  const map = useMapStore((state) => state.mapInstance);
  const [activeControl, setActiveControl] = useState<string | null>('select');
  const { vectorSource, vectorLayer } = useVectorLayer();
  const { modify, selectPointerMove, polygon, rectangle } = useInteractions(vectorSource);

  const controls: Array<IControl> = [
    {
      name: 'select',
      icon: <PiCursor size={24} />,
      handler: () => selectPointerMove.setActive(true),
    },
    {
      name: 'polygon',
      icon: <PiPolygonLight size={24} />,
      handler: () => polygon.setActive(true),
    },
    {
      name: 'rectangle',
      icon: <PiRectangle size={24} />,
      handler: () => rectangle.setActive(true),
    },
    { name: 'undo', icon: <PiArrowCounterClockwise size={24} />, handler: () => handleUndo() },
    { name: 'url', icon: <PiImage size={24} />, handler: () => handleOpenModal() },
  ];

  const handleUndo = useCallback(() => {
    const features = vectorSource.getFeatures();
    if (features.length > 0) {
      vectorSource.removeFeature(features[features.length - 1]);
    }
  }, [vectorSource]);

  const handleAddLayer = useCallback(() => {
    map?.addLayer(vectorLayer);
  }, [map, vectorLayer]);

  const deactivateAllInteractions = useCallback(() => {
    polygon.setActive(false);
    rectangle.setActive(false);
    selectPointerMove.setActive(false);
  }, [polygon, rectangle, selectPointerMove]);

  const handleControlClick = useCallback(
    (name: string) => {
      if (!map) return;
      setActiveControl(name);
      deactivateAllInteractions();

      const [control] = controls.filter((control) => control.name == name);

      control.handler();
      handleAddLayer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [map],
  );

  useEffect(() => {
    if (map) {
      map.addInteraction(selectPointerMove);
      map.addInteraction(modify);
      map.addInteraction(polygon);
      map.addInteraction(rectangle);
      deactivateAllInteractions();
    }
  }, [map, selectPointerMove, modify, vectorLayer, polygon, rectangle, deactivateAllInteractions]);

  return (
    <MapControlsContainer>
      {controls.map(({ name, icon }) => (
        <Button
          key={name}
          colorScheme={activeControl === name ? 'teal' : 'gray'}
          onClick={() => handleControlClick(name)}
          variant="solid"
          width={14}
          height={12}
        >
          {icon}
        </Button>
      ))}
    </MapControlsContainer>
  );
};

export default MapControls;
