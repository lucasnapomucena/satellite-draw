import { Avatar, Box, Flex, useDisclosure } from '@chakra-ui/react';
import Sidebar from '../Sidebar';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <React.Fragment>
      <Box bg="white" px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <button onClick={onOpen} aria-label="Open menu">
            <HamburgerIcon />
          </button>

          <img src="/satellite-draw.svg" alt="Satellite" width="36" height="36" />

          <Avatar size="md" name="Lucas Napomucena" src="https://avatars.githubusercontent.com/u/51701018?v=4" />
        </Flex>
      </Box>

      {isOpen && <Sidebar isOpen={isOpen} onClose={onClose} />}
    </React.Fragment>
  );
};

export default Header;
