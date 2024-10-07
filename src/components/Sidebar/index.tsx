import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex } from '@chakra-ui/react';

interface SidebarProps {
  onClose: () => void;
  isOpen: boolean;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="flex-start" alignItems="center" gap={4}>
            <img src="/satellite-draw.svg" alt="Satellite" width="32" height="32" />
            Satellite draw
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
