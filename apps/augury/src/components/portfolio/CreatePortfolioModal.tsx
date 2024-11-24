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
  NumberInput,
  NumberInputField,
  VStack,
  useDisclosure,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Box,
} from '@chakra-ui/react';
import Select, { StylesConfig } from 'react-select';
import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../../api/Environments';
import AddButton from '../generic/AddButton';
import fetchAllPortfoliosForUser from './utils/GetAllPortfolios';
import { PortfolioInterface } from './PortfolioCard';
import makeAnimated from 'react-select/animated';
import { sectorOptions } from '../onboarding/onboardingData';
import portfolioIdAtom from './atoms/portfolioAtoms';
import { useRecoilState } from 'recoil';
interface CreatePortfolioModalProps {
  groupId?: string;
  onSave: (portfolio: PortfolioInterface) => void; // onSave should accept a PortfolioInterface
}
const animatedComponents = makeAnimated();
const colourStyles: StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: 'color.black' }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'color.black',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'gray' : 'black',
    color: 'white',
    ':hover': {
      backgroundColor: 'gray',
      color: 'white',
    },
  }),
};
function PortfolioModal({ groupId, onSave }: CreatePortfolioModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [portfolioId, setPortfolioId] = useRecoilState(portfolioIdAtom);
  const toast = useToast();
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    riskPercentage1: 0,
    riskPercentage2: 100,
    sectorTags: [],
  });

  // States for "Add Existing Portfolio to Group" tab
  const [existingPortfolios, setExistingPortfolios] = useState<
    PortfolioInterface[]
  >([]);
  const [selectedPortfolioIds, setSelectedPortfolioIds] = useState<string>('');
  /*useEffect(() => {
    // Fetch all portfolios for this user
    async function loadPortfolios() {
      try {
        const portfolios = await fetchAllPortfoliosForUser(userId);
        setExistingPortfolios(portfolios);
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      }
    }
    loadPortfolios();
  }, [userId]);*/

  // Function to handle portfolio creation
  async function handleCreatePortfolio() {
    try {
      const createResponse = await axios.post(
        `${SERVER_URL}/portfolio`,
        portfolioData
      );
      const newPortfolio = createResponse.data.portfolio;
      console.log('Create response:', createResponse.data);
      setPortfolioId(createResponse.data.portfolio.id);
      console.log(groupId);
      if (groupId) {
        await axios.put(`${SERVER_URL}/portfolio/group/${groupId}`, {
          portfolios: [newPortfolio.id],
        });
      }

      toast({
        title: 'Portfolio created.',
        description: `Portfolio ${createResponse.data.portfolio.name} created successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setPortfolioData({
        name: '',
        riskPercentage1: 0,
        riskPercentage2: 100,
        sectorTags: [],
      });
      onClose();
      onSave(newPortfolio);
    } catch (error: any) {
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

  // Function to handle adding selected portfolios to a group
  /*async function handleAddToGroup() {
    try {
      await axios.put(`${SERVER_URL}/portfolio/group/${userId}`, {
        portfolios: selectedPortfolioIds,
      });
      toast({
        title: 'Portfolios added to group.',
        description: 'Selected portfolios have been added to the group.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error adding portfolios to group.',
        description: error.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  }*/

  return (
    <>
      <AddButton
        onClick={onOpen}
        aria-label="Open Portfolio Modal"
        aira-label={''}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Portfolio Management</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="enclosed" colorScheme="blue">
              <TabList>
                <Tab>Create Portfolio</Tab>
                <Tab>Add Existing Portfolio to Group</Tab>
              </TabList>

              <TabPanels>
                {/* Create Portfolio Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Portfolio Name</FormLabel>
                      <Input
                        placeholder="Enter portfolio name"
                        value={portfolioData.name || ''}
                        onChange={(e) =>
                          setPortfolioData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Stocks</FormLabel>
                      <NumberInput
                        min={0}
                        max={100}
                        value={portfolioData.riskPercentage1 || 0}
                        step={5}
                        onChange={(valueString) =>
                          setPortfolioData((prev) => ({
                            ...prev,
                            riskPercentage1: parseFloat(valueString),
                            riskPercentage2: 100 - parseFloat(valueString),
                          }))
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormLabel>Bonds</FormLabel>
                      <NumberInput
                        max={100}
                        min={0}
                        value={portfolioData.riskPercentage2 || 0}
                        step={5}
                        isReadOnly
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Sector Tags</FormLabel>
                      <Select
                        components={animatedComponents}
                        options={sectorOptions}
                        styles={colourStyles}
                        onChange={(selectedOptions) => {
                          const labels = selectedOptions
                            ? // @ts-expect-error map does exist
                              selectedOptions.map((option) => option.label)
                            : [];
                          setPortfolioData((prev) => ({
                            ...prev,
                            sectorTags: labels,
                          }));
                        }}
                        isMulti
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>

                {/* Add Existing Portfolio to Group Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Select Portfolios to Add</FormLabel>
                      <Select
                        isMulti
                        placeholder="Select portfolios"
                        options={existingPortfolios.map((portfolio) => ({
                          value: portfolio.id,
                          label: portfolio.name,
                        }))}
                        onChange={(selectedOptions) =>
                          setSelectedPortfolioIds(
                            //@ts-expect-error map is really  weird with ts
                            selectedOptions.map((option) => option.value)
                          )
                        }
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePortfolio}>
              {selectedPortfolioIds.length > 0
                ? 'Add to Group'
                : 'Create Portfolio'}
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

export default PortfolioModal;
