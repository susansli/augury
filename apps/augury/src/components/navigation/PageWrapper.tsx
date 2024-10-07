import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import PageIcon from './NavbarIcon';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { navbarShowAtom, navbarPageAtom } from './atoms/navigationAtoms';
import { navbarPages } from './navbarPagesData';
import { Toaster } from 'react-hot-toast';

interface Props {
  children?: ReactNode;
}

export interface NavbarPage {
  icon: IconDefinition;
  iconActivated?: IconDefinition;
  link: string;
  text: string;
  baseValue: number;
}

export default function PageWrapper(props: Props): JSX.Element {
  const isNavShown: boolean = useRecoilValue(navbarShowAtom);
  const activePage: number = useRecoilValue(navbarPageAtom);

  function renderNavbarIcons(): JSX.Element[] {
    return navbarPages.map((tab, index) => {
      return (
        <PageIcon
          icon={tab.icon}
          link={tab.link}
          text={tab.text}
          index={index}
          key={index}
        />
      );
    });
  }

  return (
    <>
      <Toaster />
      <Flex
        width="100vw"
        height="100vh"
        flexDirection="column"
      >
        <Box flex="1">{props?.children}</Box>
        {isNavShown && (
          <Flex height={14} roundedTop={10} overflow="hidden">
            {renderNavbarIcons()}
          </Flex>
        )}
      </Flex>
    </>
  );
}
