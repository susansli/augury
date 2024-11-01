import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
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
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { OnboardingStages } from './Onboarding';
import {
  onboardingCompAtom,
  onboardingRiskAtom,
} from './atoms/onboardingAtoms';
import { sectorOptions } from './onboardingData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { onboardingSectorAtom } from '../onboarding/atoms/onboardingAtoms';

// These represent % equities for the portfolio composition
export enum CompositionValues {
  AGGRESIVE = 90,
  BALANCED = 80,
  CONSERVATIVE = 60,
}
interface PageProps {
  setStage: (currStage: OnboardingStages) => void;
}

const animatedComponents = makeAnimated();

const colourStyles: StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: 'color.black' }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'color.black',
  }),
};

export default function OnboardingDefaults(props: PageProps): JSX.Element {
  const [customCompEnabled, setCustomCompEnabled] =
    useRecoilState(onboardingRiskAtom);
  const [compValue, setCompValue] = useRecoilState(onboardingCompAtom);
  const [selectedSectors, setSelectedSectors] =
    useRecoilState(onboardingSectorAtom);
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
        <ChakraSelect
          defaultValue={CompositionValues.BALANCED}
          isDisabled={customCompEnabled}
          onChange={(e) => {
            setCompValue(parseInt(e.target.value));
          }}
        >
          <option value={CompositionValues.AGGRESIVE}>Aggressive</option>
          <option value={CompositionValues.BALANCED}>Balanced</option>
          <option value={CompositionValues.CONSERVATIVE}>Conservative</option>
        </ChakraSelect>
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
        <Select
          components={animatedComponents}
          options={sectorOptions}
          styles={colourStyles}
          onChange={(selectedOptions) => {
            // Check if selectedOptions is an array and then map to get labels
            const labels = selectedOptions
              ? selectedOptions.map((option) => option.label)
              : [];
            //console.log(labels); // Logs the array of labels
            setSelectedSectors(labels);
          }}
          isMulti
        />
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
