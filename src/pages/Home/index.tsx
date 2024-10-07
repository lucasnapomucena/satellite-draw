import { ModalForm, MapControls } from '@/modules/home/index';
import MapComponent from '@/components/Map';
import { Main } from '@/layout/Main';
import { useState } from 'react';
import { S } from './style';

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Main>
      <S.MapContent>
        <MapComponent>
          <MapControls handleOpenModal={() => setIsOpen(true)} />
          <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </MapComponent>
      </S.MapContent>
    </Main>
  );
};

export default Home;
