import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OnboardingStages } from './Onboarding';
import { useNavigate } from 'react-router-dom';

interface PageProps {
  setStage: (currStage: OnboardingStages) => void;
}

export default function OnboardingDisclaimer(props: PageProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <FormControl color="text.body">
      <Flex direction="column" gap={2}>
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Augury is not financial advice
        </FormLabel>
        <FormLabel>
          Augury is powered by AI, which is prone to making mistakes. Please consult a financial advisor before using Augury's suggestions when it comes to your own portfolio!
        </FormLabel>

        <Flex width="100%" gap={2}>
          <Button
            flex={1}
            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            variant="outline"
            onClick={() => props.setStage(OnboardingStages.BALANCE)}
          >
            Prev
          </Button>
          <Button
            flex={1}
            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            bgColor="background.surface1"
            onClick={() => navigate('/portfolio')}
          >
            I understand
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
