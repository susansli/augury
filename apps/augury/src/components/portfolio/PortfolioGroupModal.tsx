import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AddButton from '../generic/AddButton';
import axios from 'axios';
import { SERVER_URL } from '../../api/Environments';
import { useRecoilState } from 'recoil';
import { portfolioGroupAtom } from './atoms/portfolioAtoms';
import { PortfolioColor } from './portfolioData';
import { PortfolioInterface } from './PortfolioCard';
import AuthStoreManager from '../../helpers/AuthStoreManager';
export interface PortfolioGroupInterface {
  name: string;
  color: PortfolioColor;
  userId: string;
  portfolios?: string[] | PortfolioInterface[];
  portfolioCurrency?: string; // ISO 4217 currency code for flavour
}
function PortfolioGroupModal({ onSave }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const userId = AuthStoreManager.getUserId();
  // Use Recoil atom for portfolio data
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioGroupAtom);
  useEffect(() => {
    // Set default values if portfolioData is empty
    setPortfolioData((prev) => ({
      ...prev,
      name: prev.name || 'default',
      color: prev.color || PortfolioColor.RED,
      userId: userId || '',
    }));
  }, [setPortfolioData]);

  async function handleSave() {
    try {
      console.log(portfolioData);
      // TODO: ADD POST TO SERVER
      const response = await axios.post(
        `${SERVER_URL}/portfolio/group`,
        portfolioData
      );
      toast({
        title: 'Portfolio group created.',
        description: `Portfolio group created successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      console.log(response.data);

      setPortfolioData({
        name: '',
        color: PortfolioColor.WHITE,
        userId: '',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error creating portfolio.',
        description: error.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  }

  return (
    <>
      <AddButton onClick={onOpen} aira-label="Open Portfolio Modal" />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Portfolio Group</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl isRequired>
                <FormLabel>Portfolio Group Name</FormLabel>
                <Input
                  placeholder="Enter group name"
                  value={portfolioData.name || ''}
                  onChange={(e) =>
                    setPortfolioData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PortfolioGroupModal;
