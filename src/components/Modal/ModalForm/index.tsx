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
import { useMap } from '@/hooks/index';
import proj4 from 'proj4';
import { fromEPSGCode, register } from 'ol/proj/proj4.js';
import { Projection } from 'ol/proj';

register(proj4);

export const ModalFormTiff = () => {
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

    const projection = source
      .getView()
      .then((config) =>
        fromEPSGCode((config?.projection as Projection)?.getCode()).then(
          () => config,
        ),
      );

    map?.setView(projection);
    map?.addLayer(layer);
  };

  const handleGetGeoTiffUrl = async (url: string): Promise<GeoTIFF> => {
    return new GeoTIFF({
      sources: [{ url: url }],
      wrapX: false,
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

export default ModalFormTiff;
