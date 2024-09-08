import 'leaflet/dist/leaflet.css';
import React from 'react';

import { MapContainer, TileLayer, MapContainerProps } from 'react-leaflet';

interface MapProps extends MapContainerProps {
  children?: React.ReactNode;
}

export const MapContainerComponent = ({ children, ...rest }: MapProps) => {
  return (
    <MapContainer
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
      {...rest}
    >
      <div style={{ display: 'none' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </div>
    </MapContainer>
  );
};

export default MapContainerComponent;
