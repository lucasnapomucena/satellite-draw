import { ModalFormTiff, MapControls } from '@components/index';
import MapProvider from '@context/MapContext';

const Home = () => {
  return (
    <>
      <MapProvider>
        <MapControls />
        <ModalFormTiff />
      </MapProvider>
    </>
  );
};

export default Home;
