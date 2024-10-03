import {
  Box,
  Flex,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VisuallyHidden,
} from '@chakra-ui/react';
import { OnboardingPage } from '../../atoms/onboarding/atom';
import { useRecoilState } from 'recoil';
import OnboardingBalance from './Balance';
import OnboardingDefaults from './Defaults';
import OnboardingDisclaimer from './Disclaimer';

function CustomTab(props: { text: string }): JSX.Element {
  return (
    <Tab
      w="20"
      h="1"
      overflow="hidden"
      bg="background.overlay0"
      _selected={{ bg: 'color.lavender' }}
      borderRadius="10"
    >
      <VisuallyHidden>{props.text}</VisuallyHidden>
    </Tab>
  );
}

export default function OnboardingUI(): JSX.Element {
  const [onboardingPage, setOnboardingPage] = useRecoilState(OnboardingPage);

  return (
    <Flex direction="column">
      <Box m="10" w="fit-content">
        <Tabs onChange={(index) => setOnboardingPage(index)} variant="unstyled">
          <TabList gap="5">
            <CustomTab text="Set portfolio defaults" />
            <CustomTab text="Set starting balance" />
            <CustomTab text="Disclamer" />
          </TabList>

          <TabPanels>
            <TabPanel p="0" mt="5">
              <OnboardingDefaults />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingBalance />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingDisclaimer />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
