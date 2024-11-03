import { useRecoilState } from "recoil";
import { onboardingRiskAtom, onboardingCompAtom } from "../onboarding/atoms/onboardingAtoms";
import { Text, Flex, Spacer, Tooltip, IconButton, Icon, Select as ChakraSelect, Checkbox, Divider, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CompositionValues } from "../onboarding/OnboardingDefaults";
import colors from "../../theme/foundations/colours";

export default function SettingsPortfolioDefaults(): JSX.Element {

  const [customCompEnabled, setCustomCompEnabled] =
  useRecoilState(onboardingRiskAtom);
const [compValue, setCompValue] = useRecoilState(onboardingCompAtom);

function setNumSpinnerValue(value: string): void {
  const newCustomValue = 100 - parseInt(value);
  setCompValue(newCustomValue);
}


  return (
    <Flex
    direction="column"
    borderRadius="10"
    padding="1rem 1rem 2rem 1rem"
    width="100%"
    backgroundColor={colors.background.selBg}
    marginTop="5"
    gap="3"
  >
    <Flex alignItems="center">
      <Text fontWeight="semibold" color="text.body">
        Portfolio Defaults
      </Text>
      <Spacer />
      <Tooltip
        label="Equity/Bond percentages and Perferred Sectors are used for AI suggestions only."
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
    </Flex>
    <ChakraSelect defaultValue={CompositionValues.BALANCED}>
      <option value={CompositionValues.AGGRESIVE}>Aggressive</option>
      <option value={CompositionValues.BALANCED}>Balanced</option>
      <option value={CompositionValues.CONSERVATIVE}>Conservative</option>
    </ChakraSelect>

    <Checkbox>
      <Text fontSize="sm">Custom Composition</Text>
    </Checkbox>

    <Divider margin="0.25rem 0" />

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
  </Flex>
  );
}