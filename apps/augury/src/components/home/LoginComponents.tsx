import { Button, Flex, Text } from '@chakra-ui/react';
import GoogleIcon from '../../assets/icons/GoogleIcon';

export default function LoginComponents(): JSX.Element {
  return (
    <Flex flexDir="column" alignItems="center" gap="3">
      <Text fontFamily="monospace" fontSize="3xl">
        augury.ai
      </Text>
      <Text fontFamily="monospace" fontSize="sm">
        invest like a pro, with AI in tow
      </Text>
      <Button marginTop="5" leftIcon={<GoogleIcon />}>
        <Flex>
          <Text>Continue With Google</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
