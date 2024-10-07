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
import proj4 from 'proj4';
import { fromEPSGCode, register } from 'ol/proj/proj4.js';
import { Projection } from 'ol/proj';
import { useMapStore } from '@/store/useMapStore';

register(proj4);

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalForm = ({ isOpen = false, onClose }: ModalFormProps) => {
  const map = useMapStore((state) => state.mapInstance);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForm = async (value: string) => {
    setIsLoading(true);
    const source = await handleGetGeoTiffUrl(value);
    handleSetGeoTiff(source);
    setIsLoading(false);
    onClose();
  };

  const handleSetGeoTiff = (source: GeoTIFF) => {
    const layer = new WebGLTileLayer({
      source: source,
    });

    const projection = source
      .getView()
      .then((config) => fromEPSGCode((config?.projection as Projection)?.getCode()).then(() => config));

    map?.setView(projection);
    map?.getLayers().insertAt(1, layer);
  };

  const handleGetGeoTiffUrl = async (url: string): Promise<GeoTIFF> => {
    return new GeoTIFF({
      sources: [{ url: url }],
      wrapX: false,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Load your .tiff image</ModalHeader>
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

export default ModalForm;
