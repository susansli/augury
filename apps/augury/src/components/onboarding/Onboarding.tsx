import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VisuallyHidden,
} from '@chakra-ui/react';
import OnboardingBalance from './Balance';
import OnboardingDefaults from './Defaults';
import OnboardingDisclaimer from './Disclaimer';
import { useState } from 'react';

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
  const [onboardingPage, setOnboardingPage] = useState(0);

  function setPage(index: number): undefined {
    if (index < 0 || index > 2) {
      // TODO: Handle moving to other pages
      // Need to find out what pages they'll go to
      return undefined;
    }
    setOnboardingPage(index);
    return undefined;
  }

  return (
    <Flex direction="column">
      <Box m="10">
        <Tabs index={onboardingPage} onChange={setPage} variant="unstyled">
          <TabList gap="5">
            <CustomTab text="Set portfolio defaults" />
            <CustomTab text="Set starting balance" />
            <CustomTab text="Disclamer" />
          </TabList>

          <TabPanels>
            <TabPanel p="0" mt="5">
              <OnboardingDefaults setPage={setPage} />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingBalance setPage={setPage} />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingDisclaimer setPage={setPage} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
