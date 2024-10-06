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
import OnboardingBalance from './OnboardingBalance';
import OnboardingDefaults from './OnboardingDefaults';
import OnboardingDisclaimer from './OnboardingDisclaimer';
import { useState } from 'react';

export enum OnboardingStages {
  DEFAULTS,
  BALANCE,
  DISCLAIMER,
}

export default function OnboardingUI(): JSX.Element {
  const [onboardingStage, setOnboardingStage] = useState<OnboardingStages>(
    OnboardingStages.DEFAULTS
  );

  function CustomTab(props: { text: string }): JSX.Element {
    return (
      <Tab
        w="20"
        h="1"
        overflow="hidden"
        bg="background.overlay0"
        borderRadius="10"
        _selected={{ bg: 'color.lavender' }}
      >
        <VisuallyHidden>{props.text}</VisuallyHidden>
      </Tab>
    );
  }

  function setCurrentStage(currStage: OnboardingStages): void {
    setOnboardingStage(currStage);
  }

  function getCurrentStageEnum(index: number) {
    switch (index) {
      case 0:
        return OnboardingStages.DEFAULTS;
      case 1:
        return OnboardingStages.BALANCE;
      case 2:
        return OnboardingStages.DISCLAIMER;
      default:
        return OnboardingStages.DEFAULTS;
    }
  }

  return (
    <Flex direction="column">
      <Box m="10">
        <Tabs
          index={onboardingStage}
          onChange={(e) => {
            const clickedStage: OnboardingStages = getCurrentStageEnum(e);
            setOnboardingStage(clickedStage);
          }}
          variant="unstyled"
        >
          <TabList gap="5">
            <CustomTab text="Set portfolio defaults" />
            <CustomTab text="Set starting balance" />
            <CustomTab text="Disclamer" />
          </TabList>

          <TabPanels>
            <TabPanel p="0" mt="5">
              <OnboardingDefaults
                setStage={setCurrentStage}
              />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingBalance
                setStage={setCurrentStage}
              />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingDisclaimer
                setStage={setCurrentStage}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
