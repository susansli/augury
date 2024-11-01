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
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { navbarShowAtom } from '../navigation/atoms/navigationAtoms';
import { tabTitles } from './onboardingData';
import toast from 'react-hot-toast';
import AuthStoreManager from '../../helpers/AuthStoreManager';

export enum OnboardingStages {
  DEFAULTS,
  BALANCE,
  DISCLAIMER,
}

export default function OnboardingUI(): JSX.Element {
  const [onboardingStage, setOnboardingStage] = useState<OnboardingStages>(
    OnboardingStages.DEFAULTS
  );

  const setNavbarVisible = useSetRecoilState(navbarShowAtom);

  useEffect(() => {
    setNavbarVisible(false);
    return () => setNavbarVisible(true);
  }, []);

  function renderCustomTabs(): JSX.Element[] {
    return tabTitles.map((title) => {
      return (
        <Tab
          w="20"
          h="1"
          overflow="hidden"
          bg="background.overlay0"
          borderRadius="10"
          _selected={{ bg: 'color.lavender' }}
        >
          <VisuallyHidden>{title}</VisuallyHidden>
        </Tab>
      );
    });
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
          <TabList gap="5">{renderCustomTabs()}</TabList>

          <TabPanels>
            <TabPanel p="0" mt="5">
              <OnboardingDefaults setStage={setCurrentStage} />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingBalance setStage={setCurrentStage} />
            </TabPanel>
            <TabPanel p="0" mt="5">
              <OnboardingDisclaimer setStage={setCurrentStage} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
