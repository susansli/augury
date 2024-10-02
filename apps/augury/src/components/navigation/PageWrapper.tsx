import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import PageIcon from './PageIcon';
import {
  faHouse,
  faBriefcase,
  faGear,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { navbarShowState, navbarPageState } from '../../atoms/navbar/atom';

interface Props {
  children?: ReactNode;
}

interface navbarPage {
  icon: IconDefinition;
  iconActivated?: IconDefinition; // If we move to an icon set that has filled in icons
  link: string;
  text?: string; // For screen readers
  baseValue?: number; // For managing the 'active tab', could probably do this better
}

// TODO: consider making this better
const navbarPages: navbarPage[] = [
  {
    icon: faHouse,
    link: '/',
    text: 'home',
    baseValue: 0,
  },
  {
    icon: faBriefcase,
    link: '/portfolio',
    text: 'portfolio',
    baseValue: 1,
  },
  {
    icon: faGear,
    link: '/settings',
    text: 'settings',
    baseValue: 2,
  },
];

export default function PageWrapper(props: Props): JSX.Element {
  const showNav = useRecoilState(navbarShowState);
  const activePage = useRecoilState(navbarPageState);

  return (
    <Flex
      width="100vw"
      height="100vh"
      overflow="hidden"
      flexDirection="column"
      bgColor="background.base"
    >
      <Box flex="1">{props?.children}</Box>
      {showNav && (
        <Flex height={14} roundedTop={10} overflow="hidden">
          {navbarPages.map((tab) => {
            return (
              <PageIcon
                icon={tab.icon}
                link={tab.link}
                text={tab.text}
                activated={tab.baseValue === activePage[0]}
              />
            );
          })}
        </Flex>
      )}
    </Flex>
  );
}
