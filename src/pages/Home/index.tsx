import { ModalForm, MapControls } from '@/modules/home/index';
import { MapProvider } from '@/context/index';

const Home = () => {
  return (
    <MapProvider>
      <MapControls />
      <ModalForm />
    </MapProvider>
  );
};

export default Home;
