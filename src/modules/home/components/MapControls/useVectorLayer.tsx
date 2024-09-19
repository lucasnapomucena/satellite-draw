import Layer from 'ol/layer/Vector';
import Source from 'ol/source/Vector';

export const useVectorLayer = () => {
  const vectorSource = new Source();
  const vectorLayer = new Layer({ source: vectorSource });
  return { vectorSource, vectorLayer };
};
