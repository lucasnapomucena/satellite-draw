import { useRef, useState } from 'react';

import { RasterService } from './../../services';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const Home = () => {
  const mapContainerRef = useRef(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGetGeoUrl = async (inputText: string) => {
    setIsLoading(true);

    const rasterService = await RasterService.getGeoFile(inputText, 100);

    if (rasterService) {
      handleSetMap(rasterService);
    }
  };

  const handleSetMap = async (rasterService) => {
    if (rasterService) {
      const bounds = await rasterService.getBounds();

      mapContainerRef?.current?.fitBounds(bounds);

      if (rasterService.addTo && typeof rasterService.addTo === 'function') {
        rasterService.addTo(mapContainerRef.current);
      } else {
        console.error(
          'The provided service does not have a valid addTo method.',
        );
      }

      setIsOpenModal(false);
    }
  };

  return (
    <>
      <MapContainer
        ref={mapContainerRef}
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              rectangle: false,
            }}
          />
        </FeatureGroup>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Load your TIF</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="http://example.tif"
                size="lg"
                accept="tif"
                onChange={(event) => setInputText(event.target.value)}
                disabled={isLoading}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              rightIcon={<ArrowForwardIcon />}
              variant="solid"
              colorScheme="green"
              onClick={() => handleGetGeoUrl(inputText)}
              isDisabled={!inputText}
              isLoading={isLoading}
            >
              Load
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
