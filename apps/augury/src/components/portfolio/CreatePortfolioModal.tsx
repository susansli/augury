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
} from '@chakra-ui/react';
import { PortfolioInterface } from './PortfolioCard';
import Select, { StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CompositionValues } from '../onboarding/OnboardingDefaults';
import { onboardingAtomSelector } from '../onboarding/atoms/onboardingAtoms';
import { sectorOptions } from '../onboarding/onboardingData';
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
export interface PortfolioDefaultBody {
  balance: string;
  composition: CompositionValues;
  risk: boolean;
  sectors: string[];
}

interface PortfolioModalProps {
  onSave: (portfolioData: PortfolioInterface) => void;
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
function PortfolioModal({ onSave }: PortfolioModalProps) {
  const onboardingDefaults = useRecoilValue(onboardingAtomSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState('');
  const [customRiskPercentage1, setCustomRiskPercentage1] = useState<number>(0);
  const [selectedSectors, setSelectedSectors] = useState([]);
  function setNumSpinnerValue(value: string): void {
    const newCustomValue = 100 - parseInt(value);
    setCustomRiskPercentage1(newCustomValue);
  }

  useEffect(() => {
    setCustomRiskPercentage1(onboardingDefaults.composition);
  }, []);
  function handleSave() {
    const portfolioData = {
      name,
      customRiskPercentage1: customRiskPercentage1,
      customRiskPercentage2: 100 - customRiskPercentage1,
      sectorTags: selectedSectors,
    };
    onSave(portfolioData);
    onClose();
  }

  return (
    <>
      <Box position="fixed" bottom="20" right="4" zIndex="overlay">
        <IconButton
          icon={<Icon as={FontAwesomeIcon} icon={faPlus} color="text.body" />}
          onClick={onOpen}
          aria-label="Open Portfolio Modal"
          colorScheme="gray"
          borderRadius="full"
          size="lg"
          shadow="lg"
        />
      </Box>

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
                  placeholder={'Enter portfolio name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  Stocks
                  <Tooltip
                    label="Enter what percentage of your portfolio you would like recomended to be stocks"
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
                  defaultValue={onboardingDefaults.composition}
                  value={customRiskPercentage1}
                  step={5}
                  onChange={(value) =>
                    setCustomRiskPercentage1(parseInt(value))
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
                    label="Enter what percentage of your portfolio you would like recomended to be stocks."
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
                  defaultValue={100 - onboardingDefaults.composition}
                  value={100 - customRiskPercentage1}
                  step={5}
                  onChange={setNumSpinnerValue}
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
                      ? // @ts-expect-error expected
                        selectedOptions.map((option: Option) => option.label)
                      : [];
                    setSelectedSectors(labels);
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
