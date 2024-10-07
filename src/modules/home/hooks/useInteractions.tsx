import Select from 'ol/interaction/Select.js';
import Modify from 'ol/interaction/Modify.js';
import { pointerMove } from 'ol/events/condition';
import Draw, { createBox } from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';

export const useInteractions = (vectorSource: VectorSource) => {
  const modify = new Modify({ source: vectorSource });
  const selectPointerMove = new Select({ condition: pointerMove });
  const polygon = new Draw({ source: vectorSource, type: 'Polygon' });
  const rectangle = new Draw({
    source: vectorSource,
    type: 'Circle',
    geometryFunction: createBox(),
  });

  return { modify, selectPointerMove, polygon, rectangle };
};
