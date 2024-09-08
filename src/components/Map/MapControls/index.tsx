import { FeatureGroup, Circle } from 'react-leaflet';
import { EditControl, EditControlProps } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

interface MapControlsProps extends EditControlProps {
  children?: React.ReactNode;
}

export const MapControls = ({ ...rest }: MapControlsProps) => (
  <FeatureGroup>
    <EditControl {...rest} />
    <Circle center={[51.51, -0.06]} radius={200} />
  </FeatureGroup>
);

export default MapControls;
