import { Box, Center, Flex, Image } from '@chakra-ui/react';
import LoginComponents from '../components/home/LoginComponents';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { navbarShowAtom } from '../components/navigation/atoms/navigationAtoms';

export default function Home(): JSX.Element {

  const setNavbarVisible = useSetRecoilState(navbarShowAtom);

  useEffect(() => {
    setNavbarVisible(false);
    return () => setNavbarVisible(true);
  }, []);
  
  return (
    <Box height="100%" width="100%">
      <Center height="100%" width="100%">
        <Flex flexDir="column" alignItems="center">
          <Image src="https://i.imgur.com/uHb3zUK.png" alt="mascot" width={60} />
          <LoginComponents />
        </Flex>
      </Center>
    </Box>
  );
}
