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
} from '@chakra-ui/react';
import { useState } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
      <FormLabel color="text.header" fontSize="28" fontWeight="bold">
        Set your portfolio defaults
      </FormLabel>
      <FormLabel>
        These will be the default settings applied to the portfolios you make.
        You can change this at anytime.
      </FormLabel>
      <VStack>
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
        <HStack>
          <VStack>
            <FormLabel>Stocks</FormLabel>
            <NumberInput
              isDisabled={!customCompEnabled}
              max={100}
              min={0}
              value={customCompValue}
              onChange={(value) => setCustomCompValue(+value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
          <VStack>
            <FormLabel>Bonds</FormLabel>
            <NumberInput
              isDisabled={!customCompEnabled}
              max={100}
              min={0}
              value={100 - customCompValue}
              onChange={(value) => setCustomCompValue(100 - +value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </VStack>
        </HStack>
        <VStack>
          
          {/* //TODO: Figure out exactly how this is supposed to work */}
          <FormLabel>Prefered Sectors</FormLabel>
          <Select></Select>
        </VStack>
        <HStack>
          <Button leftIcon={<FontAwesomeIcon icon={faChevronLeft}/>} variant="outline" onClick={() => props.setPage(0)}>Prev</Button>
          <Button rightIcon={<FontAwesomeIcon icon={faChevronRight}/>} bgColor="background.overlay0" onClick={() => props.setPage(1)}>Next</Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
