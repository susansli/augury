import {
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { OnboardingStages } from './Onboarding';

// These represent % equities for the portfolio composition
enum CompositionValues {
  AGGRESIVE = 90,
  BALANCED = 80,
  CONSERVATIVE = 60,
}

interface PageProps {
  setStage: (currStage: OnboardingStages) => void;
}

export default function OnboardingDefaults(props: PageProps): JSX.Element {
  const [customCompEnabled, setCustomCompEnabled] = useState<boolean>(false);
  const [compValue, setCompValue] = useState<CompositionValues | number>(
    CompositionValues.BALANCED
  );

  const navigate = useNavigate();

  function ChangeCustomCompEnabled(enabled: boolean) {
    setCustomCompEnabled(enabled);
  }

  function setNumSpinnerValue(value: string): void {
    const newCustomValue = 100 - parseInt(value);
    setCompValue(newCustomValue);
  }

  return (
    <FormControl color="text.body">
      <Flex direction="column" gap={2}>
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Set your portfolio defaults
        </FormLabel>
        <FormLabel>
          These will be the default settings applied to the portfolios you make.
          You can change this at anytime.
        </FormLabel>

        <FormLabel>Risk Level</FormLabel>
        <Select
          defaultValue={CompositionValues.BALANCED}
          isDisabled={customCompEnabled}
          onChange={(e) => {
            setCompValue(parseInt(e.target.value));
          }}
        >
          <option value={CompositionValues.AGGRESIVE}>Aggressive</option>
          <option value={CompositionValues.BALANCED}>Balanced</option>
          <option value={CompositionValues.CONSERVATIVE}>Conservative</option>
        </Select>
        <Checkbox
          isChecked={customCompEnabled}
          onChange={(e) => ChangeCustomCompEnabled(e.target.checked)}
        >
          Custom Composition
        </Checkbox>
        <Flex gap={2}>
          <Flex direction="column" flex={1}>
            <FormLabel>Stocks</FormLabel>
            <NumberInput
              isDisabled={!customCompEnabled}
              max={100}
              min={0}
              value={compValue}
              step={5}
              onChange={(value) => setCompValue(parseInt(value))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Flex direction="column" flex={1}>
            <FormLabel>Bonds</FormLabel>
            <NumberInput
              isDisabled={!customCompEnabled}
              max={100}
              min={0}
              value={100 - compValue}
              step={5}
              onChange={setNumSpinnerValue}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </Flex>
        {/* //TODO: Replace with multiselect */}
        <FormLabel>Prefered Sectors</FormLabel>
        <Select>
          <option>Technology</option>
          <option>Real Estate</option>
          <option>Financial Institutions</option>
          <option>Security</option>
          <option>Natural Resources</option>
        </Select>

        <Flex width="100%" gap={2}>
          <Button
            flex={1}
            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            variant="outline"
            onClick={() => navigate('/')}
          >
            Prev
          </Button>
          <Button
            flex={1}
            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            bgColor="background.surface1"
            onClick={() => props.setStage(OnboardingStages.BALANCE)}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
