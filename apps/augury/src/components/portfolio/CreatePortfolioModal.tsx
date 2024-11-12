import {
  Button,
  IconButton,
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
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Tooltip,
  Icon,
  useToast,
} from '@chakra-ui/react';
import Select, { StylesConfig } from 'react-select';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { onboardingAtomSelector } from '../onboarding/atoms/onboardingAtoms';
import { sectorOptions } from '../onboarding/onboardingData';
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import portfolioAtom from './atoms/portfolioAtoms';
import axios from 'axios';
import { SERVER_URL } from '../../api/Environments';
import AddButton from '../generic/AddButton';

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

function PortfolioModal({ onSave }) {
  const onboardingDefaults = useRecoilValue(onboardingAtomSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Use Recoil atom for portfolio data
  const [portfolioData, setPortfolioData] = useRecoilState(portfolioAtom);

  useEffect(() => {
    // Initialize risk composition from onboarding defaults
    setPortfolioData((prev) => ({
      ...prev,
      riskPercentage1: onboardingDefaults.composition,
      riskPercentage2: 100 - onboardingDefaults.composition,
      sectorTags: onboardingDefaults.sectors,
    }));
  }, [onboardingDefaults, setPortfolioData]);

  // Update secondary risk percentage dynamically

  // Save portfolio data and send to parent component
  async function handleSave() {
    try {
      console.log(portfolioData);
      const response = await axios.post(
        `${SERVER_URL}/portfolio`,
        portfolioData
      ); // Send POST request to /portfolio route
      // Show success message and log response
      toast({
        title: 'Portfolio created.',
        description: `Portfolio ${response.data.portfolio.name} created successfully.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      console.log(response.data);

      // Clear the form and close modal
      setPortfolioData({
        name: '',
        riskPercentage1: 0,
        riskPercentage2: 0,
        sectorTags: [],
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
          <ModalHeader>Create Portfolio</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                <FormLabel>
                  Stocks
                  <Tooltip
                    label="Enter what percentage of your portfolio you would like recommended to be stocks"
                    placement="bottom-start"
                    fontSize="xs"
                    width="10rem"
                  >
                    <IconButton
                      aria-label="more-info"
                      background="none"
                      padding="0"
                      _focus={{ background: 'none' }}
                      icon={
                        <Icon
                          as={FontAwesomeIcon}
                          icon={faQuestionCircle}
                          color="text.body"
                        />
                      }
                    />
                  </Tooltip>
                </FormLabel>
                <NumberInput
                  min={0}
                  max={100}
                  value={portfolioData.riskPercentage1 || 0}
                  step={5}
                  onChange={(valueString) =>
                    setPortfolioData((prev) => ({
                      ...prev,
                      riskPercentage1: parseFloat(valueString),
                    }))
                  }
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormLabel>
                  Bonds
                  <Tooltip
                    label="Enter what percentage of your portfolio you would like recommended to be bonds."
                    placement="bottom-start"
                    fontSize="xs"
                    width="10rem"
                  >
                    <IconButton
                      aria-label="more-info"
                      background="none"
                      padding="0"
                      _focus={{ background: 'none' }}
                      icon={
                        <Icon
                          as={FontAwesomeIcon}
                          icon={faQuestionCircle}
                          color="text.body"
                        />
                      }
                    />
                  </Tooltip>
                </FormLabel>
                <NumberInput
                  max={100}
                  min={0}
                  value={100 - portfolioData.riskPercentage1}
                  step={5}
                  onChange={(valueString) =>
                    setPortfolioData((prev) => ({
                      ...prev,
                      riskPercentage2: parseFloat(valueString),
                    }))
                  }
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
                  defaultValue={onboardingDefaults.sectors}
                  onChange={(selectedOptions) => {
                    const labels = selectedOptions
                      ? selectedOptions.map((option) => option.label)
                      : [];
                    setPortfolioData((prev) => ({
                      ...prev,
                      sectorTags: labels, // Update sectorTags here
                    }));
                  }}
                  isMulti
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

export default PortfolioModal;
