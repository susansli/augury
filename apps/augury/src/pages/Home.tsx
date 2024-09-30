import { Box, Flex } from '@chakra-ui/react';
import LoginComponents from '../components/home/LoginComponents';

export default function Home(): JSX.Element {
  return (
    <Box height="100vh" width="100%">
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="100%"
      >
        <LoginComponents />
      </Flex>
    </Box>
  );
}
