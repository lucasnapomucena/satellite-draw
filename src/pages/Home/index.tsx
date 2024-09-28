import { ModalForm, MapControls } from '@/modules/home/index';
import MapComponent from '@/components/Map';

const Home = () => {
  return (
    <MapComponent>
      <MapControls />
      <ModalForm />
    </MapComponent>
  );
};

export default Home;
