import { Box, Center } from '@chakra-ui/react';
import LoginComponents from '../components/home/LoginComponents';

export default function Home(): JSX.Element {
  return (
    <Box height="100%" width="100%">
      <Center height="100%" width="100%">
        <LoginComponents />
      </Center>
    </Box>
  );
}
