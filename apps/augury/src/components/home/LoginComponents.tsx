import { Button, Flex, Text } from '@chakra-ui/react';
import GoogleIcon from '../../assets/icons/GoogleIcon';
import { useNavigate } from 'react-router-dom';

export default function LoginComponents(): JSX.Element {
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" alignItems="center" gap="3">
      <Text color="text.header" fontFamily="monospace" fontSize="3xl">
        augury.ai
      </Text>
      <Text color="text.subtitle0" fontFamily="monospace" fontSize="sm">
        invest like a pro, with AI in tow
      </Text>
      <Button
        color="text.body"
        bgColor="background.surface0"
        marginTop="5"
        leftIcon={<GoogleIcon />}
        onClick={() => navigate('/onboarding')}
      >
        <Flex>
          <Text>Continue With Google</Text>
        </Flex>
      </Button>
    </Flex>
  );
}
