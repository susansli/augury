import { Box, Center, Flex, Image } from '@chakra-ui/react';
import LoginComponents from '../components/home/LoginComponents';

export default function Home(): JSX.Element {
  return (
    <Box height="100%" width="100%">
      <Center height="100%" width="100%">
        <Flex flexDir="column" alignItems="center">
          <Image src="https://i.imgur.com/uHb3zUK.png" alt="mascot" width="15rem" />
          <LoginComponents />
        </Flex>
      </Center>
    </Box>
  );
}
