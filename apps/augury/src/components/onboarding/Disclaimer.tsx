import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface PageProps {
  setPage: (page: number) => undefined;
}

export default function OnboardingDisclaimer(props: PageProps): JSX.Element {
  return (
    <FormControl color="text.body">
      <Flex direction={'column'} gap={2}>
        <FormLabel color="text.header" fontSize="28" fontWeight="bold">
          Augury is not financial advice
        </FormLabel>
        <FormLabel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum
          risus rhoncus leo pretium pretium. Suspendisse fringilla magna at
          commodo bibendum. Sed faucibus, elit mattis blandit cursus, massa
          felis mattis nisl, eget ullamcorper tortor arcu consequat eros.
          Aliquam et magna augue.
        </FormLabel>

        <Flex width={'100%'} gap={2}>
          <Button
            flex={1}
            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
            variant="outline"
            onClick={() => props.setPage(1)}
          >
            Prev
          </Button>
          <Button
            flex={1}
            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
            bgColor="background.surface1"
            onClick={() => props.setPage(3)}
          >
            I understand
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
}
