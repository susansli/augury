import {
  Text,
  Flex,
  Icon,
  IconButton,
  Spacer,
  Tooltip,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Button,
} from '@chakra-ui/react';
import colors from '../../theme/foundations/colours';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { onboardingBalanceAtom } from '../onboarding/atoms/onboardingAtoms';
import { useRecoilState } from 'recoil';
import { parseValues, formatValues } from '../../helpers/format';

export default function SettingsAccountBalance(): JSX.Element {
  const [value, setValue] = useRecoilState(onboardingBalanceAtom);

  return (
    <Flex
      direction="column"
      borderRadius="10"
      padding="1rem 1rem 1.5rem 1rem"
      width="100%"
      backgroundColor={colors.background.selBg}
      marginTop="5"
      gap="3"
    >
      <Flex alignItems="center">
        <Text fontWeight="semibold" color="text.body">
          Modify Account Balance
        </Text>
        <Spacer />
        <Tooltip
          label="Add a dollar amount to your account balance, use negative if deducting."
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

      <NumberInput
        onChange={(valueString) => setValue(parseValues(valueString))}
        value={formatValues(value)}
        step={10}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Flex>
        <Spacer />
        <Button>Save Changes</Button>
      </Flex>
    </Flex>
  );
}
