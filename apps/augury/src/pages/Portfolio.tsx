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
  Switch,
  NumberInput,
  NumberInputField,
  CheckboxGroup,
  Checkbox,
  VStack,
  useDisclosure,
  Box,
  Heading,
  Stack,
  Card,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Tooltip,
  Icon,
  Flex,
  Spacer,
  Divider,
} from '@chakra-ui/react';
import Select, { StylesConfig } from 'react-select';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { CompositionValues } from '../components/onboarding/OnboardingDefaults';
import { onboardingAtomSelector } from '../components/onboarding/atoms/onboardingAtoms';
import { sectorOptions } from '../components/onboarding/onboardingData';
import makeAnimated from 'react-select/animated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import colors from '../theme/foundations/colours';
import SettingsAccountBalance from '../components/settings/SettingsAccountBalance';
import SettingsLogOut from '../components/settings/SettingsLogOut';
import SettingsPortfolioDefaults from '../components/settings/SettingsPortfolioDefaults';
export interface PortfolioDefaultBody {
  balance: string;
  composition: CompositionValues;
  risk: boolean;
  sectors: string[];
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
function PortfolioModal({ onSave }) {
  const onboardingDefaults = useRecoilValue(onboardingAtomSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  function getDefaultOptions(labels) {
    sectorOptions.filter((option) => labels.includes(option.label));
    labels.map((option) => option.label);
  }

  const [name, setName] = useState('');
  const [customRiskPercentage1, setCustomRiskPercentage1] = useState();
  const [selectedSectors, setSelectedSectors] = useState([]);
  function setNumSpinnerValue(value: string): void {
    const newCustomValue = 100 - parseInt(value);
    setCustomRiskPercentage1(newCustomValue);
  }
  useEffect(() => {
    setCustomRiskPercentage1(onboardingDefaults.composition);
  }, []);
  const handleSave = () => {
    const portfolioData = {
      name,
      customRiskPercentage1: customRiskPercentage1,
      customRiskPercentage2: 100 - customRiskPercentage1,
      sectorTags: selectedSectors,
    };
    onSave(portfolioData);
    onClose();
  };

  return (
    <>
      <Flex direction="column" gap="2" margin="10">
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Portfolios
        </FormLabel>
        <Divider />
      </Flex>
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
                  defaultValue={getDefaultOptions(onboardingDefaults.sectors)}
                  onChange={(selectedOptions) => {
                    const labels = selectedOptions
                      ? // @ts-ignore
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
            <Button mr={3} onClick={handleSave}>
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

function PortfolioCard({ portfolioData }) {
  return (
    <Card
      as="button"
      w="20rem"
      h="7rem"
      overflow="hidden"
      shadow="md"
      backgroundColor={colors.background.selBg}
    >
      <CardHeader>
        <Text fontWeight="semibold" color="text.body">
          {portfolioData.name}
        </Text>
      </CardHeader>
      <CardBody
        display="flex"
        flexDirection="column"
        alignItems="left"
        mt="-6" // Negative margin to reduce space above CardBody
      >
        <>
          <Text fontSize="sm" textAlign="left">
            <strong>Stocks:</strong> {portfolioData.customRiskPercentage1}%{' '}
            <strong>Bonds:</strong> {portfolioData.customRiskPercentage2}%
          </Text>
          <Text fontSize="sm" textAlign="left">
            <strong> Sectors:</strong>{' '}
            {portfolioData.sectorTags?.join(', ') || 'None'}
          </Text>
        </>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
}

function PortfolioCards() {
  const [portfolios, setPortfolios] = useState([]);

  const addPortfolio = (portfolio) => {
    setPortfolios([...portfolios, portfolio]);
  };

  return (
    <Box p={5}>
      <PortfolioModal onSave={addPortfolio} />

      <Stack spacing={4} mt={5}>
        {portfolios.map((portfolio, index) => (
          <PortfolioCard key={index} portfolioData={portfolio} />
        ))}
      </Stack>
    </Box>
  );
}

export default PortfolioCards;
