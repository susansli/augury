import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatValues, parseValues } from '../../helpers/format';
import { OnboardingStages } from './Onboarding';
import { useRecoilState } from 'recoil';
import { onboardingBalanceAtom } from './atoms/onboardingAtoms';
import { useEffect } from 'react';
interface PageProps {
  setStage: (currStage: OnboardingStages) => void;
}
export default function OnboardingBalance(props: PageProps): JSX.Element {

  const [value, setValue] = useRecoilState(onboardingBalanceAtom);
  
  useEffect(() => {
    setValue(value);
  }, []);

  return (
    <FormControl color="text.body">
      <Flex direction="column" gap={2}>
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Set starting balance
        </FormLabel>
        <FormLabel>
          This is the starting amount of cash your account will hold. You can
          change or add to this amount as you wish.
        </FormLabel>
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
        <Flex width="100%" gap={2}>
          <Button
            flex={1}
            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            variant="outline"
            onClick={() => props.setStage(OnboardingStages.DEFAULTS)}
          >
            Prev
          </Button>
          <Button
            flex={1}
            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            bgColor="background.surface1"
            onClick={() => props.setStage(OnboardingStages.DISCLAIMER)}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
