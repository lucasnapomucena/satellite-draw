import { ArrowForwardIcon } from '@chakra-ui/icons';
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
import { useState } from 'react';
import { GeoTIFF } from 'ol/source';
import WebGLTileLayer from 'ol/layer/WebGLTile.js';
import { useMap } from './../../../hooks';

export const ModalLoadTiff = () => {
  const map = useMap();
  const [inputText, setInputText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = async (value: string) => {
    setIsLoading(true);
    const source = await handleGetGeoTiffUrl(value);
    handleSetGeoTiff(source);
    setIsLoading(false);
    setIsOpen(false);
  };

  const handleSetGeoTiff = (source: GeoTIFF) => {
    const layer = new WebGLTileLayer({
      source: source,
    });
    map?.removeLayer(map.getLayers().getArray()[0]);
    map?.addLayer(layer);
    map?.setView(source.getView());
  };

  const handleGetGeoTiffUrl = async (url: string): Promise<GeoTIFF> => {
    return new GeoTIFF({
      sources: [{ url: url }],
      wrapX: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
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
              value={inputText}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            rightIcon={<ArrowForwardIcon />}
            variant="solid"
            colorScheme="green"
            isDisabled={!inputText}
            isLoading={isLoading}
            onClick={() => handleSubmitForm(inputText)}
          >
            Load
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLoadTiff;
