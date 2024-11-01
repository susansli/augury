import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OnboardingStages } from './Onboarding';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { onboardingAtomSelector } from './atoms/onboardingAtoms';
import Portfolio from '../../api/portfolio/Portfolio';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface PageProps {
  setStage: (currStage: OnboardingStages) => void;
}

export default function OnboardingDisclaimer(props: PageProps): JSX.Element {
  const navigate = useNavigate();

  const onboardingDefaults = useRecoilValue(onboardingAtomSelector);
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  async function finishOnboard() {
    setIsButtonLoading(true);
    const response = await Portfolio.updatePortfolioDefaults(onboardingDefaults);
    if (!response) {
      toast.error('There was a problem setting your user defaults, please try again.');
      setIsButtonLoading(false);
    } else {
      setIsButtonLoading(false);
      navigate('/portfolio');
    }
  }

  return (
    <FormControl color="text.body">
      <Flex direction="column" gap={2}>
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Augury is not financial advice
        </FormLabel>
        <FormLabel>
          Augury is powered by AI, which is prone to making mistakes. Please
          consult a financial advisor before using Augury's suggestions when it
          comes to your own portfolio!
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
            onClick={async () => await finishOnboard()}
            isLoading={isButtonLoading}
          >
            I understand
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
