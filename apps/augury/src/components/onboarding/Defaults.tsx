import {
  FormControl,
  FormLabel,
  VStack,
  Select,
  Checkbox,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Flex,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// TODO: Put in better spot
const standardCompositionValues = [90, 50, 10];

interface PageProps {
  setPage: (page: number) => undefined;
}

export default function OnboardingDefaults(props: PageProps): JSX.Element {
  const [customCompEnabled, setCustomCompEnabled] = useState(false);
  const [customCompValue, setCustomCompValue] = useState(50);

  function ChangeCustomCompEnabled(enabled: boolean) {
    setCustomCompEnabled(enabled);
  }

  function ChangeStandardComp(index: number) {
    setCustomCompValue(standardCompositionValues[index]);
  }

  return (
    <FormControl color="text.body">
      <Flex direction={'column'} gap={2}>
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Set your portfolio defaults
        </FormLabel>
        <FormLabel>
          These will be the default settings applied to the portfolios you make.
          You can change this at anytime.
        </FormLabel>

        <FormLabel>Risk Level</FormLabel>
        <Select
          defaultValue="Balanced"
          isDisabled={customCompEnabled}
          onChange={(index) => ChangeStandardComp(index.target.selectedIndex)}
        >
          <option>Aggressive</option>
          <option>Balanced</option>
          <option>Safe</option>
        </Select>
        <Checkbox
          isChecked={customCompEnabled}
          onChange={(e) => ChangeCustomCompEnabled(e.target.checked)}
        >
          Custom Composition
        </Checkbox>
        <Flex gap={2}>
          <Flex direction={'column'} flex={1}>
            <FormLabel>Stocks</FormLabel>
            <NumberInput
              isDisabled={!customCompEnabled}
              max={100}
              min={0}
              value={customCompValue}
              step={5}
              onChange={(value) => setCustomCompValue(+value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex direction={'column'} flex={1}>
            <FormLabel>Bonds</FormLabel>
            <NumberInput
              isDisabled={!customCompEnabled}
              max={100}
              min={0}
              value={100 - customCompValue}
              step={5}
              onChange={(value) => setCustomCompValue(100 - +value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
        {/* //TODO: Figure out exactly how this is supposed to work */}
        <FormLabel>Prefered Sectors</FormLabel>
        <Select></Select>

        <Flex width={'100%'} gap={2}>
          <Button
            flex={1}
            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            variant="outline"
            onClick={() => props.setPage(-1)}
          >
            Prev
          </Button>
          <Button
            flex={1}
            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            bgColor="background.surface1"
            onClick={() => props.setPage(1)}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
