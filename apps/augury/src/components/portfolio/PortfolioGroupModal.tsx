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
export interface PortfolioGroupInterface {
  name: string;
  color: PortfolioColor;
  userId: any;
  portfolios?: string[];
}
function PortfolioGroupModal({ onSave }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Use Recoil atom for portfolio data
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioGroupAtom);
  useEffect(() => {
    // Set default values if portfolioData is empty
    setPortfolioData((prev) => ({
      ...prev,
      name: prev.name || 'hello',
      color: prev.color || PortfolioColor.RED,
      userId: prev.userId || '672a6e7501ca4cc969f7ac3b',
    }));
  }, [setPortfolioData]);
  // Update secondary risk percentage dynamically

  // Save portfolio data and send to parent component
  async function handleSave() {
    try {
      console.log(portfolioData);
      // TODO: ADD POST TO SERVER
      const response = await axios.post(
        `${SERVER_URL}/portfolio/group`,
        portfolioData
      ); // Send POST request to /portfolio route
      // Show success message and log response
      toast({
        title: 'Portfolio group created.',
        description: `Portfolio group created successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      console.log(response.data);

      // Clear the form and close modal
      setPortfolioData({
        name: '',
        color: PortfolioColor.WHITE,
        userId: '',
      });
      onClose();
    } catch (error) {
      // Handle errors and show error message
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
