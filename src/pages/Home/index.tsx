import { ModalFormTiff, MapControls } from '@/components/index';
import { MapProvider } from '@/context/index';

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
