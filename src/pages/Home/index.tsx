import { ModalLoadTiff, MapControls } from '../../components';
import MapProvider from '../../context/MapContext';

const Home = () => {
  return (
    <>
      <MapProvider>
        <MapControls />
        <ModalLoadTiff />
      </MapProvider>
    </>
  );
};

export default Home;
