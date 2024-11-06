import { Box, Flex } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import PageIcon from './NavbarIcon';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { navbarShowAtom, navbarPageAtom } from './atoms/navigationAtoms';
import { navbarPages } from './navbarPagesData';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthStoreManager from '../../helpers/AuthStoreManager';

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

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/') {
      handleIntialUserIdStore();
    } else {
      const userId = AuthStoreManager.getUserId();
      if (userId) {
        navigate('/portfolio');
      }
    }
  }, [location.pathname]);

  function handleIntialUserIdStore(): void {

    function storeUserId() {
      const idStored = AuthStoreManager.storeUserId();
        if (!idStored) {
          toast.error(
            'There was an error storing userId. Please refresh the page.'
          );
        } else {
          toast.success('Awesome, now you just have to set your defaults!');
        }
    }

    if (location.pathname.includes('onboarding')) {
      const userId = AuthStoreManager.getUserId();
      if (!userId.length) {
        storeUserId();
      } else {
        navigate('/portfolio');
      }
    } else if (location.pathname.includes('?id=')) {
      storeUserId();
    }
  }

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
      <Flex width="100vw" height="100vh" flexDirection="column">
        {/* I won't show this until the userID is stored in recoil */}
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
