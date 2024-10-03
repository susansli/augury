import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Select,
  Checkbox,
  HStack,
} from '@chakra-ui/react';
import { CustomComposition } from '../../atoms/onboarding/atom';
import { useRecoilState } from 'recoil';

// TODO: Put in better spot
const standardCompositionValues = [
  [90, 10],
  [50, 50],
  [10, 90],
];

export default function OnboardingDefaults(): JSX.Element {
  const [customCompEnabled, setCustomCompEnabled] =
    useRecoilState(CustomComposition);

  function ChangeCustomCompEnabled(enabled: boolean) {
    setCustomCompEnabled(enabled);
  }

  function ChangeStandardComp(index: number) {}

  return (
    <FormControl>
      <FormLabel color="text.header" fontSize="28" fontWeight="bold">
        Set your portfolio defaults
      </FormLabel>
      <FormLabel color="text.subtitle0">
        These will be the default settings applied to the portfolios you make.
        You can change this at anytime.
      </FormLabel>
      <VStack>
        <FormLabel>Risk Level</FormLabel>
        <Select
          placeholder="Select risk level"
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
        <HStack></HStack>
      </VStack>
    </FormControl>
  );
}
